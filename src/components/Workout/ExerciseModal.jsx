import React from 'react';
import { X, Play, Timer, Activity, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTimer } from '../../context/TimerContext';

const ExerciseModal = ({ exercise, onClose }) => {
  const { t } = useLanguage();
  const { setRestTimer } = useTimer();

  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-800 w-full max-w-lg rounded-2xl border border-indigo-500/30 shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 flex justify-between items-start border-b border-gray-700">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{t(exercise.name)}</h3>
            <div className="flex space-x-3 text-sm">
              <span className="text-indigo-300">{exercise.sets} {t({ en: 'Sets', ar: 'مجموعات' })}</span>
              <span className="text-gray-500">•</span>
              {exercise.duration ? (
                <span className="text-emerald-300">{exercise.duration}s {t({ en: 'Duration', ar: 'المدة' })}</span>
              ) : (
                <span className="text-emerald-300">{exercise.reps} {t({ en: 'Reps', ar: 'تكرارات' })}</span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors bg-white/5 p-1 rounded-full hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Description */}
          {exercise.desc && (
            <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
              <h4 className="text-indigo-400 font-bold mb-2 flex items-center">
                <Info size={16} className="mr-2" />
                {t({ en: 'Technique', ar: 'التقنية' })}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">{t(exercise.desc)}</p>
            </div>
          )}

          {/* Warmup */}
          {exercise.warmup && (
            <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
              <h4 className="text-amber-400 font-bold mb-2 flex items-center">
                <Activity size={16} className="mr-2" />
                {t({ en: 'Warm-up', ar: 'الإحماء' })}
              </h4>
              <p className="text-gray-300 text-sm">{t(exercise.warmup)}</p>
            </div>
          )}

          {/* Timer Action */}
          <div className="bg-gray-700/30 p-4 rounded-xl border border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gray-700 p-2 rounded-lg mr-3">
                <Timer className="text-emerald-400" size={24} />
              </div>
              <div>
                <span className="block text-gray-300 text-xs uppercase tracking-wide">{t({ en: 'Rest Interval', ar: 'فترة الراحة' })}</span>
                <span className="text-xl font-mono font-bold text-white">{exercise.rest}s</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setRestTimer(exercise.rest);
                onClose();
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold flex items-center transition-all shadow-lg shadow-emerald-900/20"
            >
              <Play size={16} className="mr-2" fill="currentColor" />
              {t({ en: 'Start Rest', ar: 'ابدأ الراحة' })}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;
