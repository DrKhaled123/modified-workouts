import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const { t, language } = useLanguage();
  
  const [timer, setTimer] = useState({ minutes: 5, seconds: 0 }); // Configuration
  const [timeLeft, setTimeLeft] = useState(0); // Actual running time
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('work'); // 'work' or 'rest'
  const [showTimer, setShowTimer] = useState(false); // Visibility of floating widget

  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play sound if we had one, for now just alert
      setTimeout(() => {
        alert(timerMode === 'work' 
          ? t({ en: 'Time is up!', ar: 'الوقت انتهى!' })
          : t({ en: 'Rest time finished!', ar: 'وقت الراحة انتهى!' })
        );
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, timerMode, t]);

  const startTimer = (mode = 'work', duration = null) => {
    if (duration) {
      // If duration is provided (in seconds), use it
      setTimeLeft(duration);
    } else {
      // Use configured time
      if (timer.minutes === 0 && timer.seconds === 0) {
        alert(t({ en: 'Please set a valid time', ar: 'يرجى ضبط وقت صالح' }));
        return;
      }
      setTimeLeft(timer.minutes * 60 + timer.seconds);
    }
    setTimerMode(mode);
    setIsTimerRunning(true);
    setShowTimer(true); // Auto-show timer when started
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(timer.minutes * 60 + timer.seconds);
  };

  const closeTimer = () => {
    setShowTimer(false);
  };

  const setRestTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    setTimer({ minutes: mins, seconds: secs });
    startTimer('rest', seconds);
  };

  return (
    <TimerContext.Provider value={{
      timer, setTimer,
      timeLeft, setTimeLeft,
      isTimerRunning, setIsTimerRunning,
      timerMode, setTimerMode,
      startTimer, pauseTimer, resetTimer,
      setRestTimer,
      showTimer, setShowTimer, closeTimer
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
