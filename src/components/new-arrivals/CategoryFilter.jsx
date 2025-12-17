// components/new-arrivals/CategoryFilter.jsx
import React from "react";
import { motion } from "framer-motion";

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
         <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={() => setActiveCategory("all")}
           className={`px-6 py-3 rounded-xl font-semibold transition-all ${
             activeCategory === "all"
               ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
               : "bg-white/95 backdrop-blur-xl border border-white/40 text-gray-700 hover:bg-gray-50"
           }`}
         >
           All New
         </motion.button>
         
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
                 ? `${category.buttonGradient} text-white shadow-lg`
                 : "bg-white/95 backdrop-blur-xl border border-white/40 text-gray-700 hover:bg-gray-50"
             }`}
           >
             {category.name}
           </motion.button>
         ))}
       </div>
  );
};

export default CategoryFilter;