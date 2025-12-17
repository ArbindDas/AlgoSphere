

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Users, 
  Sparkles, 
  LogIn, 
  UserPlus 
} from "lucide-react";


const MobileMenu = ({ isMenuOpen, setIsMenuOpen, location, navigate, theme }) => {
  const navItems = [
    { path: "/", label: "Home", icon: <Rocket size={18} /> },
    { path: "/about", label: "About", icon: <Users size={18} /> },
    { path: "/new", label: "New Arrivals", icon: <Sparkles size={18} /> },
    { path: "/contact", label: "Contact", icon: <Users size={18}/> }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden overflow-hidden"
        >
          <div className={`px-6 py-4 space-y-2 ${
            theme === 'dark'
              ? 'border-gray-800 bg-gray-900'
              : 'border-gray-200 bg-white'
          } border-t`}>
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                whileHover={{ x: 10 }}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? theme === 'dark'
                      ? 'bg-purple-900/30 text-purple-300'
                      : 'bg-purple-50 text-purple-600'
                    : theme === 'dark'
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
                {isActive(item.path) && (
                  <div className={`ml-auto w-2 h-2 rounded-full ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`} />
                )}
              </motion.button>
            ))}

            {/* Auth Links in Mobile Menu */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-xl font-semibold ${
                  theme === 'dark'
                    ? 'border border-purple-800 text-purple-300 hover:bg-purple-900/20'
                    : 'border border-purple-200 text-purple-600 hover:bg-purple-50'
                }`}
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
                className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
              >
                Sign Up
              </motion.button>
            </div>

            {/* Features Mobile */}
            <div className={`p-4 mt-4 rounded-xl ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20'
                : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}>
              <h4 className={`font-bold mb-3 flex items-center gap-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
              }`}>
                <Sparkles size={16} />
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {["AI Tools", "Smart Deals", "AR/VR", "Analytics"].map(
                  (feature) => (
                    <span
                      key={feature}
                      className={`px-3 py-2 rounded-lg text-sm text-center font-medium ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      {feature}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;