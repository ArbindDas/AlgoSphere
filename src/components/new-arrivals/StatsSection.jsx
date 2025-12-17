
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const StatsSection = ({ theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  const stats = [
    { value: "500+", label: "New Products This Week", icon: "🆕" },
    { value: "24h", label: "Average Arrival Time", icon: "⚡" },
    { value: "4.8★", label: "Customer Rating", icon: "⭐" },
    { value: "98%", label: "Satisfaction Rate", icon: "❤️" }
  ];

  return (
    <div className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl mb-16 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-800/90 to-purple-900/20 border-gray-700/50 shadow-black/20'
        : 'bg-gradient-to-br from-white/90 to-purple-50/50 border-white/40 shadow-black/5'
    }`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`text-center p-6 rounded-2xl transition-all hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/30'
                : 'bg-white/50 hover:bg-white/80 border border-gray-200/50'
            }`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className={`text-3xl font-bold mb-1 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {stat.value}
            </div>
            <div className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;