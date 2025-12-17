// components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart } from "lucide-react";

const ProductCard = ({ image, title, price, originalPrice, rating, reviewCount, category, isNew, isSale, delay = 0 }) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="group relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
            NEW
          </span>
        )}
        {isSale && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all">
        <Heart size={18} className="text-gray-600 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded">
            {category}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
            ))}
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-800">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-lg text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;


