import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X } from "lucide-react";

const CountdownBanner = ({ showCountdown, setShowCountdown }) => {
  return (
    <AnimatePresence>
      {showCountdown && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl shadow-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-white" />
                <div>
                  <h3 className="text-white font-bold text-lg">Launch Special Ending Soon!</h3>
                  <p className="text-white/80 text-sm">Limited time discounts on new arrivals</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-white/80 text-xs">HOURS</div>
                </div>
                <div className="text-white">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">45</div>
                  <div className="text-white/80 text-xs">MINS</div>
                </div>
                <button
                  onClick={() => setShowCountdown(false)}
                  className="text-white/80 hover:text-white ml-4 transition-colors"
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