import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ExerciseModal from './ExerciseModal';

const WorkoutSection = ({ goal, plan, onBack }) => {
  const { t } = useLanguage();
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (!plan) {
    return (
      <div className="text-center py-12">
        <button onClick={onBack} className="text-indigo-400 hover:text-indigo-300 mb-4 flex items-center justify-center">
          <ArrowLeft className="mr-2" /> {t({ en: 'Back', ar: 'عودة' })}
        </button>
        <p className="text-gray-500">{t({ en: 'No plan available for this goal yet.', ar: 'لا توجد خطة متاحة لهذا الهدف بعد.' })}</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">{t(goal.title)}</h2>
          <p className="text-indigo-400 text-sm">{t(goal.plan)}</p>
        </div>
      </div>

      {/* Plan Grid */}
      <div className="space-y-6">
        {plan.map((dayPlan, idx) => (
          <div key={idx} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
            <div className="bg-gray-850 p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-indigo-500" />
                {t(dayPlan.day)}
              </h3>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayPlan.exercises.map((exercise, eIdx) => (
                  <div 
                    key={eIdx}
                    onClick={() => setSelectedExercise(exercise)}
                    className="bg-gray-750 hover:bg-gray-700 rounded-xl p-4 cursor-pointer transition-all border border-transparent hover:border-indigo-500/50 group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-200 group-hover:text-white">{t(exercise.name)}</h4>
                      <Info className="w-4 h-4 text-gray-600 group-hover:text-indigo-400" />
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mt-2">
                      <span className="bg-gray-800 px-2 py-1 rounded text-indigo-300">
                        {exercise.sets} Sets
                      </span>
                      <span className="bg-gray-800 px-2 py-1 rounded text-emerald-300">
                        {exercise.reps} Reps
                      </span>
                      <span className="flex items-center text-amber-300">
                        <Clock className="w-3 h-3 mr-1" />
                        {exercise.rest}s
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedExercise && (
        <ExerciseModal 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
    </div>
  );
};

export default WorkoutSection;
