import React from 'react';
import { Dumbbell, Languages, Timer } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTimer } from '../../context/TimerContext';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { setShowTimer, showTimer } = useTimer();

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-indigo-500/10 p-2 rounded-lg mr-3">
              <Dumbbell className="h-6 w-6 text-indigo-400" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              {t({ en: 'Workouts Pro', ar: 'تمارين احترافية' })}
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Timer Toggle */}
            {!showTimer && (
              <button 
                onClick={() => setShowTimer(true)}
                className="p-2 text-gray-400 hover:text-emerald-400 transition-colors rounded-full hover:bg-gray-700"
                title={t({ en: 'Open Timer', ar: 'فتح المؤقت' })}
              >
                <Timer className="h-5 w-5" />
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-gray-900 rounded-full p-1 border border-gray-700">
              <button 
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  language === 'en' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => toggleLanguage('ar')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  language === 'ar' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
