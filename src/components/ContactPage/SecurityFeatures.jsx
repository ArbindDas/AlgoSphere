

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SecurityFeatures = ({ features, theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {features.map((feature, idx) => (
        <div 
          key={idx} 
          className={`flex items-center gap-2 backdrop-blur-sm px-4 py-3 rounded-xl border transition-all hover:scale-105 ${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/70'
              : 'bg-white/50 border-gray-200/50 hover:border-gray-300 hover:bg-white/70'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            theme === 'dark'
              ? 'bg-emerald-900/30 border border-emerald-800/30'
              : 'bg-emerald-100'
          }`}>
            <feature.icon className={`w-5 h-5 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
          </div>
          <div>
            <p className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {feature.title}
            </p>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {feature.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecurityFeatures;