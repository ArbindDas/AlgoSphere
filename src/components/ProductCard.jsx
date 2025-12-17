


import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ProductCard = ({ 
  image, 
  title, 
  price, 
  originalPrice, 
  rating, 
  reviewCount, 
  category, 
  isNew, 
  isSale, 
  delay = 0 
}) => {
  const { theme } = useTheme();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Theme-based styles
  const cardBg = theme === 'dark'
    ? 'bg-gray-800/95 backdrop-blur-xl border-gray-700/40'
    : 'bg-white/95 backdrop-blur-xl border-white/40';

  const cardShadow = theme === 'dark'
    ? 'shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20'
    : 'shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10';

  const titleColor = theme === 'dark'
    ? 'text-gray-100 group-hover:text-blue-400'
    : 'text-gray-800 group-hover:text-blue-600';

  const categoryBg = theme === 'dark'
    ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50'
    : 'bg-blue-50 text-blue-600';

  const priceColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const originalPriceColor = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-400';

  const reviewColor = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-500';

  const imageBg = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
    : 'bg-gradient-to-br from-gray-100 to-gray-200';

  const gradientBg = theme === 'dark'
    ? 'from-blue-900/20 to-purple-900/20'
    : 'from-blue-100 to-purple-100';

  const wishlistButtonBg = theme === 'dark'
    ? 'bg-gray-700/80 hover:bg-gray-600'
    : 'bg-white/80 hover:bg-white';

  const wishlistButtonText = theme === 'dark'
    ? 'text-gray-300 hover:text-red-400'
    : 'text-gray-600 hover:text-red-500';

  const starEmptyColor = theme === 'dark'
    ? 'fill-gray-700 text-gray-700'
    : 'fill-gray-200 text-gray-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 border ${cardBg} ${cardShadow}`}
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
      <button className={`absolute top-4 right-4 z-10 p-2 rounded-full shadow-md hover:shadow-lg transition-all backdrop-blur-sm ${wishlistButtonBg}`}>
        <Heart size={18} className={wishlistButtonText} />
      </button>

      {/* Product Image */}
      <div className={`relative h-64 flex items-center justify-center overflow-hidden ${imageBg}`}>
        <div className={`w-48 h-48 bg-linear-to-br rounded-full ${gradientBg}`} />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-gray-900/50 to-transparent' : 'from-white/50 to-transparent'}`} />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded ${categoryBg}`}>
            {category}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={i < rating 
                  ? "fill-yellow-400 text-yellow-400" 
                  : starEmptyColor
                } 
              />
            ))}
            <span className={`text-xs ml-1 ${reviewColor}`}>({reviewCount})</span>
          </div>
        </div>

        <h3 className={`font-bold mb-2 transition-colors ${titleColor}`}>{title}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-2xl font-bold ${priceColor}`}>${price.toFixed(2)}</span>
          {originalPrice && (
            <span className={`text-lg line-through ${originalPriceColor}`}>${originalPrice.toFixed(2)}</span>
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