

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const FAQSection = ({ items, theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Shopping Questions Answered
          </h2>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Quick help for common shopping queries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700/50 hover:border-gray-600'
                  : 'bg-white border border-gray-200/50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30'
                    : 'bg-gradient-to-br from-emerald-100 to-green-100'
                }`}>
                  <item.icon className={`w-6 h-6 ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {item.question}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;