
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ContactCards = ({ cards, onCardClick }) => {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -8, scale: 1.02 }}
          onClick={() => {
            card.action && card.action();
            onCardClick();
          }}
          className={`rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm group cursor-pointer relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-800/90 border border-gray-700/50 hover:border-gray-600'
              : 'bg-white/90 border border-gray-200/50 hover:border-gray-300'
          }`}
        >
          {/* Background gradient circle */}
          <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-emerald-600/10 to-green-600/10'
              : 'bg-gradient-to-br from-emerald-500/5 to-green-500/5'
          }`} />
          
          {/* Badge */}
          {card.badge && (
            <div className="absolute top-3 right-3">
              <span className={`text-xs font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white px-2 py-1 rounded-full ${
                theme === 'dark' ? 'shadow-lg shadow-emerald-900/30' : 'shadow-md'
              }`}>
                {card.badge}
              </span>
            </div>
          )}
          
          {/* Icon container */}
          <div className={`bg-gradient-to-br ${card.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg relative z-10 ${
            theme === 'dark' ? 'shadow-lg shadow-emerald-900/30' : ''
          }`}>
            <card.icon className="w-7 h-7 text-white" />
          </div>
          
          {/* Title */}
          <h3 className={`text-lg font-bold mb-2 relative z-10 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {card.title}
          </h3>
          
          {/* Value */}
          <p className={`font-semibold mb-1 relative z-10 ${
            theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            {card.value}
          </p>
          
          {/* Description */}
          <p className={`text-sm mb-2 relative z-10 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {card.description}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <span className={`text-xs font-medium ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {card.stats}
            </span>
            <ChevronRight className={`w-4 h-4 transition-all ${
              theme === 'dark'
                ? 'text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1'
                : 'text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1'
            }`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactCards;