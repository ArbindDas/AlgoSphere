// components/new-arrivals/StatsSection.jsx
import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { value: "500+", label: "New Products This Week", icon: "🆕" },
    { value: "24h", label: "Average Arrival Time", icon: "⚡" },
    { value: "4.8★", label: "Customer Rating", icon: "⭐" },
    { value: "98%", label: "Satisfaction Rate", icon: "❤️" }
  ];

  return (
    <div className="bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl shadow-black/5 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 rounded-2xl bg-white/50 hover:bg-white/80 transition-all"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;