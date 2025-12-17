


import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ProductCategoryCard = ({ icon, title, productCount, bgColor, delay = 0 }) => {
  const { theme } = useTheme();

  // Theme-based styles
  const cardBg = theme === 'dark'
    ? 'bg-gray-800/95 backdrop-blur-xl border-gray-700/40'
    : 'bg-white/95 backdrop-blur-xl border-white/40';

  const cardShadow = theme === 'dark'
    ? 'shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20'
    : 'shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10';

  const titleColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const descriptionColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';

  const linkColor = theme === 'dark'
    ? 'text-blue-400 hover:text-blue-300'
    : 'text-blue-600 hover:text-blue-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative cursor-pointer"
    >
      <div className={`relative rounded-2xl p-8 transition-all duration-500 border ${cardBg} ${cardShadow}`}>
        <div className={`inline-flex p-4 rounded-xl mb-6 ${theme === 'dark' ? `${bgColor.replace('100', '900')} border ${bgColor.replace('100', '800')}/50` : bgColor}`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold mb-3 ${titleColor}`}>{title}</h3>
        <p className={`mb-4 ${descriptionColor}`}>Discover {productCount}+ curated products</p>
        <div className={`flex items-center font-medium group-hover:gap-2 transition-all duration-300 ${linkColor}`}>
          <span>Shop Now</span>
          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCategoryCard;