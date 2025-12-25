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
      <header >
        <div >
          <div >
            <Dumbbell  />
            <h1 >
              workouts.promedic1
            </h1>
          </div>
          
          <div >
            <div >
              <button 
                onClick={() => toggleLanguage('en')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  language === 'en' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => toggleLanguage('both')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  language === 'both' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Languages  />
              </button>
              <button 
                onClick={() => toggleLanguage('ar')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all${
                  language === 'ar' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                AR
              </button>
            </div>
            
            <p >
              {t({ 
                en: 'Professional training strategies for every body type and fitness level',
                ar: 'استراتيجيات تدريب احترافية لكل نوع جسم ومستوى لياقة'
              })}
            </p>
          </div>
        </div>
      </header>

      <main >
        <div >
          {/* Workout Timer Card */}
          <div className={`bg-card-gray ${expandedCards.timer ? 'lg:col-span-2' : ''}`}>
            <button 
              onClick={() => toggleCard('timer')}
              
            >
              <div >
                <div >
                  <Timer  />
                </div>
                <h2 >{t({ en: 'Workout Timer', ar: 'مؤقت التمرين' })}</h2>
              </div>
              {expandedCards.timer ? (
                <ChevronUp  />
              ) : (
                <ChevronDown  />
              )}
            </button>
            
            {expandedCards.timer && (
              <div >
                <div >
                  <div >
                    {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
                  </div>
                  
                  <div >
                    <div >
                      <label >{t({ en: 'Minutes', ar: 'دقائق' })}</label>
                      <input
                        type="number"
                        value={timer.minutes}
                        onChange={(e) => setTimer(prev => ({ ...prev, minutes: Math.max(0, parseInt(e.target.value) || 0) }))}
                        
                        min="0"
                        max="99"
                      />
                    </div>
                    <div >
                      <label >{t({ en: 'Seconds', ar: 'ثواني' })}</label>
                      <input
                        type="number"
                        value={timer.seconds}
                        onChange={(e) => setTimer(prev => ({ ...prev, seconds: Math.min(59, Math.max(0, parseInt(e.target.value) || 0)) }))}
                        
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
                  
                  <div >
                    <button
                      onClick={startTimer}
                      disabled={timer.isRunning || (timer.minutes === 0 && timer.seconds === 0)}
                      
                    >
                      <span >{timer.isRunning ? t({ en: 'Running', ar: 'قيد التشغيل' }) : t({ en: 'Start', ar: 'ابدأ' })}</span>
                      {timer.isRunning ? (
                        <div  />
                      ) : (
                        <Play  />
                      )}
                    </button>
                    <button
                      onClick={pauseTimer}
                      disabled={!timer.isRunning}
                      
                    >
                      <Pause  />
                      {t({ en: 'Pause', ar: 'إيقاف مؤقت' })}
                    </button>
                    <button
                      onClick={() => resetTimer()}
                      
                    >
                      <RefreshCw  />
                      {t({ en: 'Reset', ar: 'إعادة تعيين' })}
                    </button>
                  </div>
                  
                  {/* Timer Instructions */}
                  <div >
                    <div >
                      <Info  />
                      <div>
                        <h3 >{t(workoutData.timerInstructions.title)}</h3>
                        <div >
                          {workoutData.timerInstructions.steps.map((step, index) => (
                            <div key={index} >
                              <h4 >{t(step.title)}</h4>
                              <p >{t(step.desc)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {activeTimer === 'rest' && (
                    <div >
                      <p >
                        {t({ en: 'Rest Period Active', ar: 'فترة الراحة نشطة' })}
                      </p>
                      <p >
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
          <div >
            <button 
              onClick={() => toggleCard('goals')}
              
            >
              <div >
                <div >
                  <Target  />
                </div>
                <h2 >{t({ en: 'Training Goals', ar: 'أهداف التدريب' })}</h2>
              </div>
              {expandedCards.goals ? (
                <ChevronUp  />
              ) : (
                <ChevronDown  />
              )}
            </button>
            
            {expandedCards.goals && (
              <div >
                <div >
                  {workoutData.goals.map((goal) => (
                    <div 
                      key={goal.id}
                      className={`p-5 rounded-xl border cursor-pointer transition-all hover-card ${
                        workoutMode === goal.id 
                          ? 'border-emerald-500 bg-emerald-900' 
                          : 'border-gray-700'
                      }`}
                      onClick={() => setWorkoutMode(goal.id)}
                    >
                      <h3 >{t(goal.title)}</h3>
                      <p >{t(goal.desc)}</p>
                      <p >{t(goal.plan)}</p>
                      
                      <div >
                        <p >{t({ en: 'Sample Exercises:', ar: 'تمارين نموذجية:' })}</p>
                        <ul >
                          {goal.exercises.slice(0, 3).map((exercise, idx) => (
                            <li key={idx} >
                              <CheckCircle  />
                              <span >{t(exercise.name)} ({exercise.sets}×{exercise.reps})</span>
                            </li>
                          ))}
                          {goal.exercises.length > 3 && (
                            <li >
                              {t({ en: `+ ${goal.exercises.length - 3} more exercises`, ar: `+ ${goal.exercises.length - 3} تمارين إضافية` })}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div >
                  <h3 >
                    <Flame  />
                    {t({ en: 'Workout Plans Library', ar: 'مكتبة خطط التمرين' })}
                  </h3>
                  
                  <div >
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
          <div >
            <button 
              onClick={() => toggleCard('fullWeek')}
              
            >
              <div >
                <div >
                  <Calendar  />
                </div>
                <h2 >{t({ en: 'Full Week Plan', ar: 'خطة الأسبوع الكامل' })}</h2>
              </div>
              {expandedCards.fullWeek ? (
                <ChevronUp  />
              ) : (
                <ChevronDown  />
              )}
            </button>
            
            {expandedCards.fullWeek && (
              <div >
                <div >
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
                
                <div >
                  {(workoutMode === 'homeWorkout' 
                    ? workoutData.fullWeekPlans.homeWorkout 
                    : workoutMode === 'cutting'
                      ? workoutData.fullWeekPlans.cutting
                      : workoutData.fullWeekPlans.bulking
                  ).map((day, index) => (
                    <div key={index} >
                      <h3 >{t(day.day)}</h3>
                      
                      <div >
                        {day.exercises.map((exercise, exIndex) => (
                          <div 
                            key={exIndex} 
                            
                            onClick={() => handleExerciseSelect(exercise)}
                          >
                            <div >
                              <h4 >{t(exercise.name)}</h4>
                              <p >{t(exercise.desc)}</p>
                              <div >
                                <span >
                                  {t({ en: 'Sets', ar: 'مجموعات' })}: {exercise.sets}
                                </span>
                                <span >
                                  {t({ en: 'Reps', ar: 'تكرارات' })}: {exercise.reps}
                                </span>
                                <span >
                                  {t({ en: 'Rest', ar: 'راحة' })}: {exercise.rest}s
                                </span>
                              </div>
                              <div >
                                <Activity  />
                                <span>{t({ en: 'Warm-up:', ar: 'إحماء:' })} {t(exercise.warmup)}</span>
                              </div>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setRestTimer(exercise.rest);
                              }}
                              
                            >
                              <Timer  />
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
          <div >
            <button 
              onClick={() => toggleCard('warmup')}
              
            >
              <div >
                <div >
                  <Sun  />
                </div>
                <h2 >{t({ en: 'Warm-up Routines', ar: 'روتينات الإحماء' })}</h2>
              </div>
              {expandedCards.warmup ? (
                <ChevronUp  />
              ) : (
                <ChevronDown  />
              )}
            </button>
            
            {expandedCards.warmup && (
              <div >
                {workoutData.warmupRoutines.general.map((routine, index) => (
                  <div key={index} >
                    <h3 >{t(routine.title)}</h3>
                    <ol >
                      {routine.steps.map((step, stepIndex) => (
                        <li key={stepIndex} >
                          <span >{stepIndex + 1}.</span> 
                          <span >{t({ en: step.en, ar: step.ar })}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nutrition Guide Card */}
          <div >
            <button 
              onClick={() => toggleCard('nutrition')}
              
            >
              <div >
                <div >
                  <Utensils  />
                </div>
                <h2 >{t({ en: 'Nutrition Guide', ar: 'دليل التغذية' })}</h2>
              </div>
              {expandedCards.nutrition ? (
                <ChevronUp  />
              ) : (
                <ChevronDown  />
              )}
            </button>
            
            {expandedCards.nutrition && (
              <div >
                {/* Pre-workout nutrition */}
                <div >
                  <h3 >
                    <Zap  />
                    {t({ en: 'Pre-Workout Nutrition', ar: 'التغذية قبل التمرين' })}
                  </h3>
                  
                  {workoutData.nutrition.preWorkout.map((section, index) => (
                    <div key={index} >
                      <h4 >{t(section.title)}</h4>
                      <ul >
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} >
                            <Coffee  />
                            <span >{t({ en: item.en, ar: item.ar })}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                {/* Post-workout nutrition */}
                <div>
                  <h3 >
                    <Moon  />
                    {t({ en: 'Post-Workout Nutrition', ar: 'التغذية بعد التمرين' })}
                  </h3>
                  
                  {workoutData.nutrition.postWorkout.map((section, index) => (
                    <div key={index} >
                      <h4 >{t(section.title)}</h4>
                      <ul >
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} >
                            <Droplet  />
                            <span >{t({ en: item.en, ar: item.ar })}</span>
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
          <div >
            <button 
              onClick={() => toggleCard('fasting')}
              
            >
              <div >
                <div >
                  <Leaf  />
                </div>
                <h2 >{t({ en: 'Fasting Workouts', ar: 'تمارين أثناء الصيام' })}</h2>
              </div>
              {expandedCards.fasting ? (
                <ChevronUp  />
              ) : (
                <ChevronDown  />
              )}
            </button>
            
            {expandedCards.fasting && (
              <div >
                {workoutData.fasting.map((section, index) => (
                  <div key={index} >
                    <div >
                      <Brain  />
                      <h3 >{t(section.title)}</h3>
                    </div>
                    
                    <p >{t(section.content)}</p>
                  
                  <div >
                    <h4 >
                      <AlertTriangle  />
                      {t({ en: 'Key Guidelines:', ar: 'إرشادات رئيسية:' })}
                    </h4>
                    <ul >
                      {section.guidelines.map((guideline, idx) => (
                        <li key={idx} >
                          • {t({ en: guideline.en, ar: guideline.ar })}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div >
                    <h4 >
                        <BookOpen  />
                        {t({ en: 'Scientific References:', ar: 'مراجع علمية:' })}
                      </h4>
                      <ul >
                        {section.references.map((reference, idx) => (
                          <li key={idx} >
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
        <div >
          <div >
            <div >
              <div >
                <h3 >{t(activeExercise.name)}</h3>
                <button 
                  onClick={() => setShowPreExerciseModal(false)}
                  
                >
                  ✕
                </button>
              </div>
              
              <div >
                {/* Warm-up instructions */}
                <div >
                  <h4 >
                    <Sun  />
                    {t({ en: 'Warm-up Instructions', ar: 'تعليمات الإحماء' })}
                  </h4>
                  <p >{t(activeExercise.warmup)}</p>
                </div>
                
                {/* Timer setup */}
                <div >
                  <h4 >
                    <Timer  />
                    {t({ en: 'Timer Setup', ar: 'إعداد المؤقت' })}
                  </h4>
                  <div >
                    <span >{t({ en: 'Rest Period:', ar: 'فترة الراحة:' })}</span>
                    <span >
                      {Math.floor(activeExercise.rest / 60)}:{(activeExercise.rest % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p >
                    {t({ en: 'Set your timer for the rest period between sets. The timer will alert you when time is up.', ar: 'اضبط المؤقت لفترة الراحة بين المجموعات. سينبهك المؤقت عندما ينتهي الوقت.' })}
                  </p>
                </div>
                
                {/* Exercise description */}
                <div >
                  <h4 >{t({ en: 'Exercise Description', ar: 'وصف التمرين' })}</h4>
                  <p >{t(activeExercise.desc)}</p>
                </div>
                
                {/* Start timer button */}
                <div >
                  <button
                    onClick={() => {
                      setShowPreExerciseModal(false);
                      startTimer('rest');
                    }}
                    
                  >
                    <Play  />
                    {t({ en: 'Start Rest Timer', ar: 'بدء مؤقت الراحة' })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer >
        <div >
          <p >
            workouts.promedic1
          </p>
          <p >
            {t({ 
              en: 'Professional Training Strategies • No Backend Required',
              ar: 'استراتيجيات تدريب احترافية • لا يتطلب خادم خلفي'
            })}
          </p>
          <p >
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