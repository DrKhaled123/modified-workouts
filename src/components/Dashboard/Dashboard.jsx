import React, { useState } from 'react';
import { Target, Utensils, Sun, Activity, ChevronRight, BookOpen, ArrowLeft, Zap, Dna, Globe } from 'lucide-react';
import { useData } from '../../hooks/useData';
import { useLanguage } from '../../context/LanguageContext';
import WorkoutSection from '../Workout/WorkoutSection';
import ArticleViewer from '../Article/ArticleViewer';

const Dashboard = () => {
  const { goals, nutrition, workouts, loading, error } = useData();
  const { t, language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('goals');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>;
  if (error) return <div className="text-red-500 text-center p-8">{t({ en: 'Error loading data', ar: 'خطأ في تحميل البيانات' })}</div>;

  const articles = [
    { id: 'intro.md', title: { en: 'Welcome to Workouts Pro', ar: 'مرحباً بك في تمارين احترافية' }, desc: { en: 'Getting started guide', ar: 'دليل البداية' } },
    { id: 'female_workouts.md', title: { en: 'Female Training Guide', ar: 'دليل تدريب السيدات' }, desc: { en: 'Cycle Syncing & Glutes', ar: 'توافق الدورة الشهرية والألوية' } },
    { id: 'fasting.md', title: { en: 'Training During Fasting', ar: 'التمرين أثناء الصيام' }, desc: { en: 'Science & Application', ar: 'العلم والتطبيق' } },
    { id: 'home_workouts.md', title: { en: 'Home Workouts', ar: 'تمارين المنزل' }, desc: { en: 'Effectiveness Without Equipment', ar: 'الفعالية بدون معدات' } },
    { id: 'cardio.md', title: { en: 'Cardio Mastery', ar: 'إتقان الكارديو' }, desc: { en: 'HIIT vs LISS', ar: 'عالي الكثافة مقابل الثابت' } },
    { id: 'technique.md', title: { en: 'Technique & Tempo', ar: 'التقنية والإيقاع' }, desc: { en: 'The Science of Hypertrophy', ar: 'علم التضخيم' } },
    { id: 'injuries.md', title: { en: 'Injury Prevention', ar: 'الوقاية من الإصابات' }, desc: { en: 'Common Mistakes', ar: 'أخطاء شائعة' } },
    { id: 'recovery_science.md', title: { en: 'Recovery Science', ar: 'علم التعافي' }, desc: { en: 'Sleep & CNS Fatigue', ar: 'النوم وإرهاق الجهاز العصبي' } },
    { id: 'mental_toughness.md', title: { en: 'Mental Toughness', ar: 'الصلابة الذهنية' }, desc: { en: 'Psychology of Gains', ar: 'علم نفس المكاسب' } },
    { id: 'hypertrophy_mechanisms.md', title: { en: 'Advanced Hypertrophy', ar: 'التضخيم المتقدم' }, desc: { en: 'Mechanisms of Growth', ar: 'آليات النمو' } },
  ];

  const renderTabs = () => (
    <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      {[
        { id: 'goals', icon: Target, label: { en: 'Goals & Plans', ar: 'الأهداف والخطط' } },
        { id: 'nutrition', icon: Utensils, label: { en: 'Nutrition', ar: 'التغذية' } },
        { id: 'education', icon: BookOpen, label: { en: 'Education', ar: 'التعليم' } },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => { setActiveTab(tab.id); setSelectedGoal(null); setSelectedArticle(null); }}
          className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <tab.icon className="w-5 h-5 mr-2" />
          {t(tab.label)}
        </button>
      ))}
    </div>
  );

  const renderGoals = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal) => (
        <div 
          key={goal.id}
          onClick={() => setSelectedGoal(goal)}
          className="group relative overflow-hidden bg-gray-800 border-2 border-indigo-500/30 hover:border-purple-500/50 rounded-2xl p-6 transition-all cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-colors">
              {t(goal.title)}
            </h3>
            <p className="text-indigo-200/70 text-sm mb-4 line-clamp-2">{t(goal.desc)}</p>
            
            <div className="space-y-2 mb-4">
              {goal.points?.map((point, idx) => (
                <div key={idx} className="flex items-center text-xs font-medium text-gray-400 group-hover:text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  {t(point)}
                </div>
              ))}
            </div>

            {/* Techniques Box */}
            {goal.techniques && (
              <div className="bg-gray-900/50 rounded-xl p-3 border border-indigo-500/20 mt-4">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">{t({ en: 'Key Techniques', ar: 'تقنيات رئيسية' })}</h4>
                <div className="space-y-2">
                  {goal.techniques.map((tech, tIdx) => (
                    <div key={tIdx} className="text-xs">
                      <span className="text-white font-bold block">{t(tech.name)}</span>
                      <span className="text-gray-400">{t(tech.desc)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => {
    if (selectedArticle) {
      return (
        <div className="animate-slide-up">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="mb-6 flex items-center text-indigo-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t({ en: 'Back to Articles', ar: 'عودة للمقالات' })}
          </button>
          <ArticleViewer filename={selectedArticle} />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <div 
            key={article.id}
            onClick={() => setSelectedArticle(article.id)}
            className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 hover:bg-gray-750 cursor-pointer transition-all group"
          >
            <div className="flex items-start">
              <div className="p-3 bg-purple-500/10 rounded-lg mr-4 group-hover:bg-purple-500/20 transition-colors">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">{t(article.title)}</h3>
                <p className="text-gray-400 text-sm mt-1">{t(article.desc)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNutrition = () => (
    <div className="space-y-8">
      {/* Amino Acids Section */}
      {nutrition?.aminoAcids && (
        <section>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mb-6 flex items-center">
            <Dna className="mr-3 text-pink-400" />
            {t({ en: 'Amino Acids (EAA vs BCAA)', ar: 'الأحماض الأمينية' })}
          </h3>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-pink-500/30 transition-colors">
            {nutrition.aminoAcids.map((section, idx) => (
              <div key={idx}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-gray-750 rounded-xl p-4 border border-gray-600/50">
                      <h4 className="text-lg font-bold text-pink-300 mb-2">{t(item.name)}</h4>
                      <p className="text-sm text-gray-300 mb-3">{t(item.description)}</p>
                      <div className="text-xs bg-gray-900/50 p-2 rounded text-gray-400">
                        <strong className="text-pink-400">{t({ en: 'Usage:', ar: 'الاستخدام:' })}</strong> {t(item.usage)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {nutrition?.supplements && (
        <section>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 flex items-center">
            <Zap className="mr-3 text-cyan-400" />
            {t({ en: 'Vitamins & Supplements (2025)', ar: 'الفيتامينات والمكملات (2025)' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nutrition.supplements.map((category, idx) => (
              <div key={idx} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500/30 transition-colors">
                <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">{t(category.title)}</h4>
                <ul className="space-y-6">
                  {category.items.map((item, iIdx) => (
                    <li key={iIdx} className="relative pl-4 border-l-2 border-cyan-500/30">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-cyan-300">{t(item.name)}</span>
                        {item.dose && (
                          <span className="text-xs bg-gray-700 px-2 py-1 rounded text-cyan-100">{t(item.dose)}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{t(item.description)}</p>
                      {item.tip && (
                        <p className="text-xs text-emerald-400 italic mt-1 flex items-center">
                          <span className="mr-1">💡</span> {t(item.tip)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nutrition?.preWorkout && (
          <section>
            <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center">
              <Utensils className="mr-2 w-5 h-5" />
              {t({ en: 'Pre-Workout', ar: 'قبل التمرين' })}
            </h3>
            {nutrition.preWorkout.map((item, idx) => (
              <div key={idx} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-4">
                <h4 className="text-md font-bold text-white mb-3">{t(item.title)}</h4>
                <ul className="space-y-2">
                  {item.items.map((food, fIdx) => (
                    <li key={fIdx} className="text-sm text-gray-400 flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                      {t(food.name)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {nutrition?.postWorkout && (
          <section>
            <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
              <Utensils className="mr-2 w-5 h-5" />
              {t({ en: 'Post-Workout', ar: 'بعد التمرين' })}
            </h3>
            {nutrition.postWorkout.map((item, idx) => (
              <div key={idx} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-4">
                <h4 className="text-md font-bold text-white mb-3">{t(item.title)}</h4>
                <ul className="space-y-2">
                  {item.items.map((food, fIdx) => (
                    <li key={fIdx} className="text-sm text-gray-400 flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2" />
                      {t(food.name)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      {!selectedGoal && !selectedArticle && (
        <div className="mb-12 text-center sm:text-left bg-gradient-to-r from-gray-900 via-indigo-950/30 to-gray-900 p-8 rounded-3xl border border-white/5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            {t({ en: 'Transform Your Body', ar: 'حول جسمك' })}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mt-2">
              {t({ en: 'Professional Workouts', ar: 'تمارين احترافية' })}
            </span>
          </h2>
          <p className="text-indigo-200/80 max-w-2xl text-lg leading-relaxed">
            {t({ 
              en: 'Select a goal to view your personalized training plan, or explore nutrition and recovery strategies.',
              ar: 'اختر هدفاً لعرض خطة التدريب المخصصة لك، أو استكشف استراتيجيات التغذية والتعافي.'
            })}
          </p>
        </div>
      )}

      {/* Navigation */}
      {!selectedGoal && !selectedArticle && renderTabs()}

      {/* Content */}
      <div className="animate-fade-in">
        {selectedGoal ? (
          <WorkoutSection 
            goal={selectedGoal} 
            plan={workouts[selectedGoal.id]} 
            onBack={() => setSelectedGoal(null)} 
          />
        ) : (
          <>
            {activeTab === 'goals' && !selectedArticle && renderGoals()}
            {activeTab === 'nutrition' && !selectedArticle && renderNutrition()}
            {activeTab === 'education' && renderEducation()}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
