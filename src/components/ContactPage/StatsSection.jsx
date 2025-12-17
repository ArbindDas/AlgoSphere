

import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, Gift } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const StatsSection = ({ theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  const stats = [
    { value: '1M+', label: 'Happy Customers', icon: Users },
    { value: '99%', label: 'Order Accuracy', icon: CheckCircle },
    { value: '24/7', label: 'Support Available', icon: Clock },
    { value: '30-day', label: 'Return Policy', icon: Gift }
  ];

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className={`rounded-3xl p-12 shadow-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-emerald-800 to-green-700 border border-emerald-700/50'
            : 'bg-gradient-to-r from-emerald-600 to-green-500'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative ${
                  theme === 'dark' ? 'text-gray-100' : 'text-white'
                }`}
              >
                {/* Background glow effect */}
                <div className={`absolute inset-0 rounded-xl blur-xl opacity-0 hover:opacity-50 transition-opacity duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-emerald-400/30 to-green-400/30'
                    : 'bg-gradient-to-r from-white/20 to-emerald-300/20'
                }`} />
                
                {/* Stat value */}
                <div className={`text-4xl md:text-5xl font-bold mb-2 relative z-10 ${
                  theme === 'dark' ? 'drop-shadow-md' : ''
                }`}>
                  {stat.value}
                </div>
                
                {/* Icon and label */}
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <stat.icon className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-emerald-300' : 'text-emerald-100'
                  }`} />
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-emerald-200' : 'text-emerald-100'
                  }`}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;