import React from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Palette } from "lucide-react";

const AuthButtons = ({ navigate }) => {
  return (
    <div className="flex items-center gap-4 ml-4">
      {/* Login Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-purple-200 text-purple-600 font-semibold hover:bg-purple-50 transition-all"
      >
        <LogIn size={18} />
        Login
      </motion.button>

      {/* Signup Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/signup")}
        className="px-6 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center gap-2"
      >
        <UserPlus size={18} />
        Sign Up Free
      </motion.button>

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ rotate: 15 }}
        className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center hover:border-purple-300 hover:bg-purple-50/50 transition-colors"
      >
        <Palette size={18} className="text-gray-600" />
      </motion.button>
    </div>
  );
};

export default AuthButtons;