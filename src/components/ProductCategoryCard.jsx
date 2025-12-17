

// components/ProductCategoryCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ProductCategoryCard = ({ icon, title, productCount, bgColor, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative cursor-pointer"
    >
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500">
        <div className={`inline-flex p-4 rounded-xl ${bgColor} mb-6`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">Discover {productCount}+ curated products</p>
        <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all duration-300">
          <span>Shop Now</span>
          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCategoryCard;