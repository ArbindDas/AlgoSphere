// components/new-arrivals/NewArrivalCard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, Heart, Star, Truck } from "lucide-react";

const NewArrivalCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);


    return (
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -12, scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative group"
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
  
        {/* Main Card */}
        <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl shadow-black/5 overflow-hidden">
          {/* NEW Badge */}
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-lg shadow-green-500/30 flex items-center gap-2"
            >
              <Sparkles size={12} />
              NEW ARRIVAL
            </motion.div>
          </div>
  
          {/* Days ago badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 shadow-sm">
              {product.daysAgo} days ago
            </div>
          </div>
  
          {/* Product Image */}
          <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-white">
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4 }}
              className="aspect-square flex items-center justify-center p-8"
            >
              <div className={`${product.emojiSize || 'text-7xl'} transform transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                {product.emoji}
              </div>
            </motion.div>
  
            {/* Wishlist button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg z-20"
            >
              <Heart
                className={`w-5 h-5 transition-all ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'}`}
              />
            </motion.button>
  
            {/* Quick View Overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center p-6"
                >
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 rounded-xl bg-white text-gray-800 font-semibold shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Quick View
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
  
          {/* Product Info */}
          <div className="space-y-4">
            {/* Category */}
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full ${product.categoryColor} text-xs font-semibold`}>
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              </div>
            </div>
  
            {/* Title & Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            </div>
  
            {/* Price & Discount */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                      <span className="text-xs font-bold text-green-600">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-600">Free shipping</span>
                </div>
              </div>
  
              {/* Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-xl ${product.buttonGradient} text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow`}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
  
          {/* Floating elements */}
          {isHovered && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
              />
            </>
          )}
        </div>
      </motion.div>
    );
};

export default NewArrivalCard;