import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Logo = ({ navigate }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 cursor-pointer group"
      onClick={() => navigate("/")}
    >
      <div className="relative">
        <motion.div
          whileHover={{ rotate: 5 }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-purple-800 via-purple-700 to-pink-800' 
              : 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600'
          }`}
        >
          <ShoppingBag size={20} className="text-white z-10" />
          {/* Animated shine effect */}
          <div className={`absolute inset-0 opacity-30 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' 
              : 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
          } translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
        </motion.div>
        
        {/* Animated indicator */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/40'
          }`}
        />
        
        {/* AI badge */}
        <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-lg flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-sm border border-cyan-700/50'
            : 'bg-gradient-to-r from-cyan-100 to-blue-100 backdrop-blur-sm border border-cyan-200'
        }`}>
          <Sparkles size={10} className={
            theme === 'dark' ? 'text-cyan-300' : 'text-cyan-600'
          } />
        </div>
      </div>
      
      <div className="hidden sm:block">
        <div className="flex items-center gap-2">
          <h1 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-purple-300 via-pink-300 to-purple-300'
              : 'from-purple-600 via-pink-600 to-purple-600'
          }`}>
            CommercePro
          </h1>
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`w-1 h-1 rounded-full ${
              theme === 'dark' ? 'bg-cyan-400' : 'bg-cyan-500'
            }`}
          />
        </div>
        <p className={`text-xs mt-1 flex items-center gap-1 ${
          theme === 'dark' 
            ? 'text-gray-400' 
            : 'text-gray-600'
        }`}>
          <span>AI-Powered</span>
          <span className={`w-1 h-1 rounded-full ${
            theme === 'dark' ? 'bg-pink-500' : 'bg-pink-400'
          }`} />
          <span>E-commerce</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Logo;