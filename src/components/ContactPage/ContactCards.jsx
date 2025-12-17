import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ContactCards = ({ cards, onCardClick }) => {
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
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-gray-200/50 group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-emerald-500/5 to-green-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-300" />
          
          {card.badge && (
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold bg-linear-to-r from-emerald-500 to-green-600 text-white px-2 py-1 rounded-full">
                {card.badge}
              </span>
            </div>
          )}
          
          <div className={`bg-linear-to-br ${card.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg relative z-10`}>
            <card.icon className="w-7 h-7 text-white" />
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">{card.title}</h3>
          <p className="text-emerald-600 font-semibold mb-1 relative z-10">{card.value}</p>
          <p className="text-sm text-gray-500 mb-2 relative z-10">{card.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs font-medium text-gray-400">{card.stats}</span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactCards;