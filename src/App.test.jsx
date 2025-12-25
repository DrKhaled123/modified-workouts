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
</div>
);
