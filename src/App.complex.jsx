import { useState, useEffect } from 'react';
import { 
  Timer, Dumbbell, Target, ChevronDown, ChevronUp, 
  Languages, Home, Calendar, List, ArrowLeftRight,
  Flame, Leaf, Utensils, AlertTriangle, BookOpen,
  Sun, Droplet, Brain, Activity, Zap, Play, Pause,
  RefreshCw, CheckCircle, Info, Coffee, Moon
} from 'lucide-react';
import { workoutData } from './workoutData';
import './index.css';

export default function App() {
  // State management
  const [language, setLanguage] = useState('en');
  const [expandedCards, setExpandedCards] = useState({
    timer: true,
    goals: true,
    levels: false,
    tips: false,
    fullWeek: false,
    homeWorkouts: false,
    warmup: false,
    nutrition: false,
    fasting: false
  });
  const [timer, setTimer] = useState({ minutes: 0, seconds: 30, isRunning: false });
  const [activeTimer, setActiveTimer] = useState(null);
  const [workoutMode, setWorkoutMode] = useState('bulking');
  const [activeExercise, setActiveExercise] = useState(null);
  const [showPreExerciseModal, setShowPreExerciseModal] = useState(false);
  const [activePlan, setActivePlan] = useState('bulking');

  // Timer functionality
  useEffect(() => {
    let interval;
    if (timer.isRunning && (timer.minutes > 0 || timer.seconds > 0)) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            clearInterval(interval);
            return { ...prev, isRunning: false };
          }
        });
      }, 1000);
    } else if (timer.minutes === 0 && timer.seconds === 0) {
      clearInterval(interval);
      if (activeTimer) {
        const alertMessage = activeTimer === 'rest' 
          ? (language === 'ar' ? 'وقت الراحة انتهى! تجهز للتمرين التالي' : 'Rest time finished! Get ready for next exercise')
          : (language === 'ar' ? 'الوقت انتهى!' : 'Time is up!');
        
        // Use a timeout to ensure the alert doesn't block the UI thread immediately
        setTimeout(() => {
          alert(alertMessage);
        }, 100);
      }
    }
    return () => clearInterval(interval);
  }, [timer, activeTimer, language]);

  // Initialize text direction based on language
  useEffect(() => {
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [language]);

  // Card toggle handler
  const toggleCard = (card) => {
    setExpandedCards(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  // Timer control handlers
  const startTimer = (type = null) => {
    if (timer.minutes === 0 && timer.seconds === 0) {
      alert(language === 'ar' ? 'يرجى ضبط وقت صالح للمؤقت' : 'Please set a valid time for the timer');
      return;
    }
    setTimer(prev => ({ ...prev, isRunning: true }));
    setActiveTimer(type);
  };

  const pauseTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: false }));
    setActiveTimer(null);
  };

  const resetTimer = (mins = 0, secs = 30) => {
    setTimer({ minutes: mins, seconds: secs, isRunning: false });
    setActiveTimer(null);
  };

  // Set timer for exercise rest periods
  const setRestTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    resetTimer(mins, secs);
    startTimer('rest');
  };

  // Helper function for bilingual text
  const t = (textObj) => {
    if (!textObj) return '';
    if (language === 'both') {
      return `${textObj.en} / ${textObj.ar}`;
    }
    return textObj[language] || textObj.en;
  };

  // Handle exercise selection to show pre-exercise modal
  const handleExerciseSelect = (exercise) => {
    setActiveExercise(exercise);
    setShowPreExerciseModal(true);
    
    // Auto-set rest timer based on exercise
    resetTimer(0, exercise.rest);
  };

  // Language toggle handler
  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 transition-colors duration-300 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      {/* Header with logo and language toggle */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
            <Dumbbell className="h-10 w-10 text-indigo-400 mr-3" />
            <h1 className="text-3xl font-bold gradient-text-indigo">
              workouts.promedic1
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center bg-gray-800 rounded-full p-1">
              <button 
                onClick={() => toggleLanguage('en')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  language === 'en' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => toggleLanguage('both')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  language === 'both' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Languages className="h-4 w-4" />
              </button>
              <button 
                onClick={() => toggleLanguage('ar')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all${
                  language === 'ar' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                AR
              </button>
            </div>
            
            <p className="text-gray-300 text-center sm:text-left max-w-md">
              {t({ 
                en: 'Professional training strategies for every body type and fitness level',
                ar: 'استراتيجيات تدريب احترافية لكل نوع جسم ومستوى لياقة'
              })}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workout Timer Card */}
          <div className={`bg-card-gray ${expandedCards.timer ? 'lg:col-span-2' : ''}`}>
            <button 
              onClick={() => toggleCard('timer')}
              className="w-full flex items-center justify-between p-5 bg-gradient-emerald hover:bg-emerald transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="bg-icon-emerald mr-4">
                  <Timer className="h-6 w-6 text-emphasis-emerald" />
                </div>
                <h2 className="text-xl font-bold text-white">{t({ en: 'Workout Timer', ar: 'مؤقت التمرين' })}</h2>
              </div>
              {expandedCards.timer ? (
                <ChevronUp className="h-5 w-5 text-emphasis-emerald" />
              ) : (
                <ChevronDown className="h-5 w-5 text-emphasis-emerald" />
              )}
            </button>
            
            {expandedCards.timer && (
              <div className="p-6">
                <div className="text-center">
                  <div className="timer-display">
                    {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 max-w-md mx-auto">
                    <div className="flex-1">
                      <label className="block text-sm text-secondary-gray mb-1">{t({ en: 'Minutes', ar: 'دقائق' })}</label>
                      <input
                        type="number"
                        value={timer.minutes}
                        onChange={(e) => setTimer(prev => ({ ...prev, minutes: Math.max(0, parseInt(e.target.value) || 0) }))}
                        className="timer-input"
                        min="0"
                        max="99"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-secondary-gray mb-1">{t({ en: 'Seconds', ar: 'ثواني' })}</label>
                      <input
                        type="number"
                        value={timer.seconds}
                        onChange={(e) => setTimer(prev => ({ ...prev, seconds: Math.min(59, Math.max(0, parseInt(e.target.value) || 0)) }))}
                        className="timer-input"
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <button
                      onClick={startTimer}
                      disabled={timer.isRunning || (timer.minutes === 0 && timer.seconds === 0)}
                      className="btn-success"
                    >
                      <span className="mr-2">{timer.isRunning ? t({ en: 'Running', ar: 'قيد التشغيل' }) : t({ en: 'Start', ar: 'ابدأ' })}</span>
                      {timer.isRunning ? (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-2" />
                      ) : (
                        <Play className="h-4 w-4 ml-2" />
                      )}
                    </button>
                    <button
                      onClick={pauseTimer}
                      disabled={!timer.isRunning}
                      className="btn-warning"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      {t({ en: 'Pause', ar: 'إيقاف مؤقت' })}
                    </button>
                    <button
                      onClick={() => resetTimer()}
                      className="btn-danger"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {t({ en: 'Reset', ar: 'إعادة تعيين' })}
                    </button>
                  </div>
                  
                  {/* Timer Instructions */}
                  <div className="mt-6 bg-section-gray">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-accent-indigo mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-accent-indigo mb-2">{t(workoutData.timerInstructions.title)}</h3>
                        <div className="space-y-3">
                          {workoutData.timerInstructions.steps.map((step, index) => (
                            <div key={index} className="border-l-2 border-emphasis pl-3 py-1">
                              <h4 className="font-medium text-description-gray">{t(step.title)}</h4>
                              <p className="text-subtitle-gray text-sm">{t(step.desc)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {activeTimer === 'rest' && (
                    <div className="mt-4 p-4 alert-indigo">
                      <p className="text-accent-indigo font-medium">
                        {t({ en: 'Rest Period Active', ar: 'فترة الراحة نشطة' })}
                      </p>
                      <p className="text-sm text-subtitle-gray mt-1">
                        {t({ 
                          en: 'Get ready for your next set when timer reaches zero',
                          ar: 'استعد للمجموعة التالية عندما يصل المؤقت إلى الصفر'
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Training Goals Card */}
          <div className="bg-card-gray">
            <button 
              onClick={() => toggleCard('goals')}
              className="w-full flex items-center justify-between p-5 bg-gradient-emerald hover:bg-emerald transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="bg-icon-emerald mr-4">
                  <Target className="h-6 w-6 text-emphasis-emerald" />
                </div>
                <h2 className="text-xl font-bold text-white">{t({ en: 'Training Goals', ar: 'أهداف التدريب' })}</h2>
              </div>
              {expandedCards.goals ? (
                <ChevronUp className="h-5 w-5 text-emphasis-emerald" />
              ) : (
                <ChevronDown className="h-5 w-5 text-emphasis-emerald" />
              )}
            </button>
            
            {expandedCards.goals && (
              <div className="p-6">
                <div className="exercise-grid">
                  {workoutData.goals.map((goal) => (
                    <div 
                      key={goal.id}
                      className={`p-5 rounded-xl border cursor-pointer transition-all hover-card ${
                        workoutMode === goal.id 
                          ? 'border-emerald-500 bg-emerald-900/20' 
                          : 'border-gray-700'
                      }`}
                      onClick={() => setWorkoutMode(goal.id)}
                    >
                      <h3 className="text-lg font-bold text-emphasis-emerald mb-2">{t(goal.title)}</h3>
                      <p className="text-subtitle-gray mb-2 text-sm">{t(goal.desc)}</p>
                      <p className="text-accent-emerald font-medium text-sm mb-3">{t(goal.plan)}</p>
                      
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-sm text-subtitle-gray mb-2">{t({ en: 'Sample Exercises:', ar: 'تمارين نموذجية:' })}</p>
                        <ul className="space-y-1 text-sm">
                          {goal.exercises.slice(0, 3).map((exercise, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-emphasis-emerald mr-2 flex-shrink-0" />
                              <span className="text-description-gray">{t(exercise.name)} ({exercise.sets}×{exercise.reps})</span>
                            </li>
                          ))}
                          {goal.exercises.length > 3 && (
                            <li className="text-xs text-accent-indigo mt-1">
                              {t({ en: `+ ${goal.exercises.length - 3} more exercises`, ar: `+ ${goal.exercises.length - 3} تمارين إضافية` })}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                    <Flame className="h-5 w-5 text-amber-400 mr-2" />
                    {t({ en: 'Workout Plans Library', ar: 'مكتبة خطط التمرين' })}
                  </h3>
                  
                  <div className="grid-responsive">
                    {['bulking', 'cutting', 'queenShape', 'fatBurn', 'strength', 'endurance', 'homeWorkout', 'mature'].map((plan) => (
                      <button
                        key={plan}
                        onClick={() => setActivePlan(plan)}
                        className={`plan-button ${activePlan === plan ? 'plan-button-active' : ''}`}
                      >
                        {t({
                          en: plan === 'bulking' ? 'Bulking' : 
                             plan === 'cutting' ? 'Cutting' : 
                             plan === 'queenShape' ? 'Queen Shape' : 
                             plan === 'fatBurn' ? 'Fat Burn' :
                             plan === 'strength' ? 'Strength' :
                             plan === 'endurance' ? 'Endurance' :
                             plan === 'homeWorkout' ? 'Home' : 'Mature',
                          ar: plan === 'bulking' ? 'تضخيم' : 
                              plan === 'cutting' ? 'تجفيف' : 
                              plan === 'queenShape' ? 'قوام ملكي' : 
                              plan === 'fatBurn' ? 'حرق دهون' :
                              plan === 'strength' ? 'قوة' :
                              plan === 'endurance' ? 'تحمل' :
                              plan === 'homeWorkout' ? 'تمارين منزلية' : 'رياضي ناضج'
                        })}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Full Week Plan Card */}
          <div className="bg-card-gray">
            <button 
              onClick={() => toggleCard('fullWeek')}
              className="w-full flex items-center justify-between p-5 bg-gradient-amber hover:bg-amber transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="bg-icon-amber mr-4">
                  <Calendar className="h-6 w-6 text-emphasis-amber" />
                </div>
                <h2 className="text-xl font-bold text-white">{t({ en: 'Full Week Plan', ar: 'خطة الأسبوع الكامل' })}</h2>
              </div>
              {expandedCards.fullWeek ? (
                <ChevronUp className="h-5 w-5 text-emphasis-amber" />
              ) : (
                <ChevronDown className="h-5 w-5 text-emphasis-amber" />
              )}
            </button>
            
            {expandedCards.fullWeek && (
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={() => setWorkoutMode('bulking')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      workoutMode === 'bulking'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {t({ en: 'Bulking', ar: 'تضخيم' })}
                  </button>
                  <button
                    onClick={() => setWorkoutMode('cutting')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      workoutMode === 'cutting'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {t({ en: 'Cutting', ar: 'تجفيف' })}
                  </button>
                  <button
                    onClick={() => setWorkoutMode('homeWorkout')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      workoutMode === 'homeWorkout'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {t({ en: 'Home Workout', ar: 'تمارين منزلية' })}
                  </button>
                </div>
                
                <div className="space-y-6">
                  {(workoutMode === 'homeWorkout' 
                    ? workoutData.fullWeekPlans.homeWorkout 
                    : workoutMode === 'cutting'
                      ? workoutData.fullWeekPlans.cutting
                      : workoutData.fullWeekPlans.bulking
                  ).map((day, index) => (
                    <div key={index} className="bg-section-gray">
                      <h3 className="text-xl font-bold text-emphasis-amber mb-4">{t(day.day)}</h3>
                      
                      <div className="space-y-4">
                        {day.exercises.map((exercise, exIndex) => (
                          <div 
                            key={exIndex} 
                            className="exercise-card"
                            onClick={() => handleExerciseSelect(exercise)}
                          >
                            <div className="mb-3 sm:mb-0">
                              <h4 className="font-bold text-lg text-accent-cyan">{t(exercise.name)}</h4>
                              <p className="text-subtitle-gray text-sm mt-1">{t(exercise.desc)}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="tag-indigo">
                                  {t({ en: 'Sets', ar: 'مجموعات' })}: {exercise.sets}
                                </span>
                                <span className="tag-emerald">
                                  {t({ en: 'Reps', ar: 'تكرارات' })}: {exercise.reps}
                                </span>
                                <span className="tag-amber">
                                  {t({ en: 'Rest', ar: 'راحة' })}: {exercise.rest}s
                                </span>
                              </div>
                              <div className="mt-2 flex items-center text-xs text-subtitle-gray">
                                <Activity className="h-3 w-3 mr-1" />
                                <span>{t({ en: 'Warm-up:', ar: 'إحماء:' })} {t(exercise.warmup)}</span>
                              </div>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setRestTimer(exercise.rest);
                              }}
                              className="mt-2 sm:mt-0 btn-secondary"
                            >
                              <Timer className="h-4 w-4 mr-2" />
                              {t({ en: 'Set Timer', ar: 'ضبط المؤقت' })}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Warm-up Routines Card */}
          <div className="bg-card-gray">
            <button 
              onClick={() => toggleCard('warmup')}
              className="w-full flex items-center justify-between p-5 bg-gradient-pink hover:bg-pink transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="bg-icon-pink mr-4">
                  <Sun className="h-6 w-6 text-emphasis-pink" />
                </div>
                <h2 className="text-xl font-bold text-white">{t({ en: 'Warm-up Routines', ar: 'روتينات الإحماء' })}</h2>
              </div>
              {expandedCards.warmup ? (
                <ChevronUp className="h-5 w-5 text-emphasis-pink" />
              ) : (
                <ChevronDown className="h-5 w-5 text-emphasis-pink" />
              )}
            </button>
            
            {expandedCards.warmup && (
              <div className="p-6">
                {workoutData.warmupRoutines.general.map((routine, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-lg font-bold text-emphasis-pink mb-3">{t(routine.title)}</h3>
                    <ol className="warmup-ol">
                      {routine.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="list-item">
                          <span className="text-emphasis-pink font-medium">{stepIndex + 1}.</span> 
                          <span className="text-description-gray mr-2">{t({ en: step.en, ar: step.ar })}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nutrition Guide Card */}
          <div className="bg-card-gray">
            <button 
              onClick={() => toggleCard('nutrition')}
              className="w-full flex items-center justify-between p-5 bg-gradient-green hover:bg-green transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="bg-icon-green mr-4">
                  <Utensils className="h-6 w-6 text-emphasis-green" />
                </div>
                <h2 className="text-xl font-bold text-white">{t({ en: 'Nutrition Guide', ar: 'دليل التغذية' })}</h2>
              </div>
              {expandedCards.nutrition ? (
                <ChevronUp className="h-5 w-5 text-emphasis-green" />
              ) : (
                <ChevronDown className="h-5 w-5 text-emphasis-green" />
              )}
            </button>
            
            {expandedCards.nutrition && (
              <div className="p-6">
                {/* Pre-workout nutrition */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-emphasis-green mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    {t({ en: 'Pre-Workout Nutrition', ar: 'التغذية قبل التمرين' })}
                  </h3>
                  
                  {workoutData.nutrition.preWorkout.map((section, index) => (
                    <div key={index} className="bg-section-gray mb-6">
                      <h4 className="font-bold text-accent-green mb-3">{t(section.title)}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <Coffee className="h-4 w-4 text-emphasis-green mt-1 mr-2 flex-shrink-0" />
                            <span className="text-description-gray">{t({ en: item.en, ar: item.ar })}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                {/* Post-workout nutrition */}
                <div>
                  <h3 className="text-lg font-bold text-emphasis-green mb-4 flex items-center">
                    <Moon className="h-5 w-5 mr-2" />
                    {t({ en: 'Post-Workout Nutrition', ar: 'التغذية بعد التمرين' })}
                  </h3>
                  
                  {workoutData.nutrition.postWorkout.map((section, index) => (
                    <div key={index} className="bg-section-gray mb-6">
                      <h4 className="font-bold text-accent-green mb-3">{t(section.title)}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <Droplet className="h-4 w-4 text-emphasis-green mt-1 mr-2 flex-shrink-0" />
                            <span className="text-description-gray">{t({ en: item.en, ar: item.ar })}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Fasting Workout Card */}
          <div className="bg-card-gray">
            <button 
              onClick={() => toggleCard('fasting')}
              className="w-full flex items-center justify-between p-5 bg-gradient-purple hover:bg-purple transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="bg-icon-purple mr-4">
                  <Leaf className="h-6 w-6 text-emphasis-purple" />
                </div>
                <h2 className="text-xl font-bold text-white">{t({ en: 'Fasting Workouts', ar: 'تمارين أثناء الصيام' })}</h2>
              </div>
              {expandedCards.fasting ? (
                <ChevronUp className="h-5 w-5 text-emphasis-purple" />
              ) : (
                <ChevronDown className="h-5 w-5 text-emphasis-purple" />
              )}
            </button>
            
            {expandedCards.fasting && (
              <div className="p-6">
                {workoutData.fasting.map((section, index) => (
                  <div key={index} className="bg-section-gray mb-8 p-5">
                    <div className="flex items-start mb-4">
                      <Brain className="h-5 w-5 text-accent-purple mt-0.5 mr-3 flex-shrink-0" />
                      <h3 className="text-lg font-bold text-emphasis-purple">{t(section.title)}</h3>
                    </div>
                    
                    <p className="text-description-gray mb-4 leading-relaxed">{t(section.content)}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-accent-purple mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {t({ en: 'Key Guidelines:', ar: 'إرشادات رئيسية:' })}
                    </h4>
                    <ul className="space-y-2 pl-5">
                      {section.guidelines.map((guideline, idx) => (
                        <li key={idx} className="text-description-gray">
                          • {t({ en: guideline.en, ar: guideline.ar })}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-accent-purple mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {t({ en: 'Scientific References:', ar: 'مراجع علمية:' })}
                      </h4>
                      <ul className="reference-list">
                        {section.references.map((reference, idx) => (
                          <li key={idx} className="reference-item">
                            • {t({ en: reference.en, ar: reference.ar })}
                          </li>
                        ))}
                      </ul>
                    </div>
                    </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Pre-Exercise Modal */}
      {showPreExerciseModal && activeExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-modal-overlay">
          <div className="bg-modal-content max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-accent-indigo">{t(activeExercise.name)}</h3>
                <button 
                  onClick={() => setShowPreExerciseModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Warm-up instructions */}
                <div className="alert-indigo">
                  <h4 className="font-bold text-accent-indigo mb-2 flex items-center">
                    <Sun className="h-5 w-5 mr-2" />
                    {t({ en: 'Warm-up Instructions', ar: 'تعليمات الإحماء' })}
                  </h4>
                  <p className="text-description-gray">{t(activeExercise.warmup)}</p>
                </div>
                
                {/* Timer setup */}
                <div className="alert-amber">
                  <h4 className="font-bold text-accent-amber mb-3 flex items-center">
                    <Timer className="h-5 w-5 mr-2" />
                    {t({ en: 'Timer Setup', ar: 'إعداد المؤقت' })}
                  </h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-description-gray">{t({ en: 'Rest Period:', ar: 'فترة الراحة:' })}</span>
                    <span className="text-2xl font-mono font-bold text-emphasis-amber">
                      {Math.floor(activeExercise.rest / 60)}:{(activeExercise.rest % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-sm text-subtitle-gray">
                    {t({ en: 'Set your timer for the rest period between sets. The timer will alert you when time is up.', ar: 'اضبط المؤقت لفترة الراحة بين المجموعات. سينبهك المؤقت عندما ينتهي الوقت.' })}
                  </p>
                </div>
                
                {/* Exercise description */}
                <div className="alert-green">
                  <h4 className="font-bold text-accent-green mb-2">{t({ en: 'Exercise Description', ar: 'وصف التمرين' })}</h4>
                  <p className="text-description-gray italic">{t(activeExercise.desc)}</p>
                </div>
                
                {/* Start timer button */}
                <div className="pt-4 border-t border-gray-700">
                  <button
                    onClick={() => {
                      setShowPreExerciseModal(false);
                      startTimer('rest');
                    }}
                    className="btn-primary"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    {t({ en: 'Start Rest Timer', ar: 'بدء مؤقت الراحة' })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto text-center text-subtitle-gray">
          <p className="text-lg font-medium gradient-text-indigo mb-2">
            workouts.promedic1
          </p>
          <p className="mb-2">
            {t({ 
              en: 'Professional Training Strategies • No Backend Required',
              ar: 'استراتيجيات تدريب احترافية • لا يتطلب خادم خلفي'
            })}
          </p>
          <p className="footer-text-opacity">
            {t({ 
              en: 'All training plans should be approved by a certified professional. Results may vary based on individual physiology.',
              ar: 'يجب الموافقة على جميع خطط التدريب من قبل محترف معتمد. قد تختلف النتائج حسب علم وظائف الأعضاء الفردية.'
            })}
          </p>
        </div>
      </footer>
    </div>
  </div>
);
}

export default App;