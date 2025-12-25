import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-indigo-400 font-medium mb-2">workouts.promedic1</p>
        <p className="text-gray-400 text-sm mb-4">
          {t({ 
            en: 'Professional Training Strategies • No Backend Required',
            ar: 'استراتيجيات تدريب احترافية • لا يتطلب خادم خلفي'
          })}
        </p>
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">
          {t({ 
            en: 'Disclaimer: All training plans should be approved by a certified professional. Results may vary based on individual physiology.',
            ar: 'إخلاء مسؤولية: يجب الموافقة على جميع خطط التدريب من قبل محترف معتمد. قد تختلف النتائج حسب علم وظائف الأعضاء الفردية.'
          })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
