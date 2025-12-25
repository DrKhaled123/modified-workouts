import React, { useState, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import { useLanguage } from '../../context/LanguageContext';

const ArticleViewer = ({ filename }) => {
  const { fetchArticle } = useData();
  const { t, language } = useLanguage();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError(false);
      try {
        // Determine filename based on language
        let targetFile = filename;
        if (language === 'ar' && filename.endsWith('.md')) {
          targetFile = filename.replace('.md', '.ar.md');
        }

        let text = await fetchArticle(targetFile);
        
        // Fallback to English if Arabic file not found
        if (!text && language === 'ar' && targetFile !== filename) {
          console.log(`Arabic version not found for ${filename}, falling back to English`);
          text = await fetchArticle(filename);
        }

        if (text) {
          setContent(text);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (filename) {
      loadArticle();
    }
  }, [filename, fetchArticle, language]);

  // Simple Markdown Parser
  const parseMarkdown = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      
      // Headers
      if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold text-indigo-400 mb-4 mt-6 border-b border-gray-700 pb-2">{line.slice(2)}</h1>;
      if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold text-emerald-400 mb-3 mt-5">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold text-amber-400 mb-2 mt-4">{line.slice(4)}</h3>;
      
      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 py-2 my-4 bg-gray-700/50 rounded-r-lg italic text-gray-300">
            {line.slice(2)}
          </blockquote>
        );
      }

      // Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <div key={index} className="flex items-start mb-2 ml-4">
            <span className="text-indigo-500 mr-2">•</span>
            <span className="text-gray-300">{trimmed.slice(2)}</span>
          </div>
        );
      }
      if (trimmed.match(/^\d+\. /)) {
        return (
          <div key={index} className="flex items-start mb-2 ml-4">
            <span className="text-indigo-500 font-bold mr-2">{trimmed.split('.')[0]}.</span>
            <span className="text-gray-300">{trimmed.replace(/^\d+\. /, '')}</span>
          </div>
        );
      }
      
      // Bold (simple check)
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="text-gray-300 mb-2 leading-relaxed">
            {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part))}
          </p>
        );
      }

      // Empty lines
      if (!trimmed) return <div key={index} className="h-4"></div>;

      // Paragraphs
      return <p key={index} className="text-gray-300 mb-2 leading-relaxed">{line}</p>;
    });
  };

  if (loading) return (
    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-8 text-center">
      <p className="text-red-400 font-bold mb-2">{t({ en: 'Failed to load article.', ar: 'فشل تحميل المقال.' })}</p>
      <p className="text-gray-400 text-sm">{filename}</p>
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
      <div className="prose prose-invert max-w-none">
        {parseMarkdown(content)}
      </div>
    </div>
  );
};

export default ArticleViewer;
