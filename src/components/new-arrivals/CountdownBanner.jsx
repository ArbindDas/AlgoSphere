


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CountdownBanner = ({ showCountdown, setShowCountdown, theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  return (
    <AnimatePresence>
      {showCountdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className={`rounded-2xl p-6 shadow-2xl ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-800 to-pink-800 shadow-purple-900/40 border border-purple-700/50'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Clock className={`w-8 h-8 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-white'
                }`} />
                <div>
                  <h3 className={`font-bold text-lg ${
                    theme === 'dark' ? 'text-gray-100' : 'text-white'
                  }`}>
                    Launch Special Ending Soon!
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-white/80'
                  }`}>
                    Limited time discounts on new arrivals
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-white'
                  }`}>
                    24
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-300' : 'text-white/80'
                  }`}>
                    HOURS
                  </div>
                </div>
                
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-white'}>:</div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-white'
                  }`}>
                    45
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-300' : 'text-white/80'
                  }`}>
                    MINS
                  </div>
                </div>
                
                <button
                  onClick={() => setShowCountdown(false)}
                  className={`ml-4 transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountdownBanner;