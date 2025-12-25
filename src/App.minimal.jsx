import React, { useState, useEffect } from 'react';
import { Dumbbell, Languages, Timer, ChevronUp, ChevronDown } from 'lucide-react';
import { workoutData } from './workoutData';

function App() {
  const [language, setLanguage] = useState('en');
  const [expandedCards, setExpandedCards] = useState({});
  const [timer, setTimer] = useState({ minutes: 5, seconds: 0 });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPreExerciseModal, setShowPreExerciseModal] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);

  const t = (obj) => obj[language] || obj.en || '';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="py-6 px-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Dumbbell className="h-10 w-10 text-indigo-400 mr-3" />
            <h1 className="text-3xl font-bold gradient-text-indigo">
              {t({ en: 'Workouts Pro', ar: 'تمارين احترافية' })}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4" />
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded ${language === 'en' ? 'bg-indigo-600' : 'bg-gray-700'}`}>EN</button>
            <button onClick={() => setLanguage('ar')} className={`px-3 py-1 rounded ${language === 'ar' ? 'bg-indigo-600' : 'bg-gray-700'}`}>AR</button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {t({ en: 'Welcome to Workouts Pro', ar: 'مرحبا بك في تمارين احترافية' })}
          </h2>
          <p className="text-gray-300">
            {t({ en: 'Your professional fitness companion', ar: 'رفيقك الاحترافي لللياقة' })}
          </p>
        </div>
      </main>
      
      <footer className="py-8 px-4 border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>
            {t({ 
              en: 'Professional Training Strategies',
              ar: 'استراتيجيات تدريب احترافية'
            })}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;