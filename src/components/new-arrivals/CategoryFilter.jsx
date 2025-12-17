

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const CategoryFilter = ({ categories, activeCategory, setActiveCategory, theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {/* All New Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveCategory("all")}
        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
          activeCategory === "all"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
            : theme === 'dark'
              ? "bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 text-gray-300 hover:bg-gray-700"
              : "bg-white/95 backdrop-blur-xl border border-white/40 text-gray-700 hover:bg-gray-50"
        }`}
      >
        All New
      </motion.button>
      
      {/* Category Buttons */}
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(category.id)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeCategory === category.id
              ? `${category.buttonGradient} text-white shadow-lg ${
                  theme === 'dark' ? 'shadow-purple-900/40' : ''
                }`
              : theme === 'dark'
                ? "bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 text-gray-300 hover:bg-gray-700 hover:border-gray-600"
                : "bg-white/95 backdrop-blur-xl border border-white/40 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;