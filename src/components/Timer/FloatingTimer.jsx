import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, X, Minus, Maximize2 } from 'lucide-react';
import { useTimer } from '../../context/TimerContext';
import { useLanguage } from '../../context/LanguageContext';

const FloatingTimer = () => {
  const { 
    timeLeft, isTimerRunning, startTimer, pauseTimer, resetTimer, 
    timerMode, showTimer, closeTimer 
  } = useTimer();
  const { t } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!showTimer) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeColor = () => {
    return timerMode === 'work' ? 'border-indigo-500' : 'border-amber-500';
  };

  const getModeBg = () => {
    return timerMode === 'work' ? 'bg-indigo-900/90' : 'bg-amber-900/90';
  };

  if (isMinimized) {
    return (
      <div 
        className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg cursor-pointer transition-all ${getModeBg()} text-white border-2 ${getModeColor()} animate-pulse`}
        onClick={() => setIsMinimized(false)}
      >
        <span className="font-mono font-bold text-sm">{formatTime(timeLeft)}</span>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-72 bg-gray-800 rounded-xl shadow-2xl border-2 ${getModeColor()} overflow-hidden transition-all duration-300 transform`}>
      {/* Header */}
      <div className={`px-4 py-2 flex items-center justify-between ${timerMode === 'work' ? 'bg-indigo-800' : 'bg-amber-800'}`}>
        <span className="text-xs font-bold uppercase tracking-wider text-white">
          {timerMode === 'work' ? t({ en: 'Work Timer', ar: 'مؤقت العمل' }) : t({ en: 'Rest Timer', ar: 'مؤقت الراحة' })}
        </span>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(true)} className="text-white/80 hover:text-white">
            <Minus size={14} />
          </button>
          <button onClick={closeTimer} className="text-white/80 hover:text-white">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col items-center">
        <div className="text-5xl font-mono font-bold mb-4 text-white tracking-widest">
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center space-x-4 w-full justify-center">
          {!isTimerRunning ? (
            <button 
              onClick={() => startTimer(timerMode)} 
              className="p-3 bg-green-600 hover:bg-green-500 rounded-full text-white transition-colors shadow-lg"
            >
              <Play size={20} fill="currentColor" />
            </button>
          ) : (
            <button 
              onClick={pauseTimer} 
              className="p-3 bg-yellow-600 hover:bg-yellow-500 rounded-full text-white transition-colors shadow-lg"
            >
              <Pause size={20} fill="currentColor" />
            </button>
          )}
          
          <button 
            onClick={resetTimer} 
            className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full text-white transition-colors shadow-lg"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      {isTimerRunning && (
        <div className="h-1 w-full bg-gray-700">
          <div 
            className={`h-full ${timerMode === 'work' ? 'bg-indigo-400' : 'bg-amber-400'} transition-all duration-1000`}
            style={{ width: '100%' }} // You could make this accurate if you tracked initial time
          />
        </div>
      )}
    </div>
  );
};

export default FloatingTimer;
