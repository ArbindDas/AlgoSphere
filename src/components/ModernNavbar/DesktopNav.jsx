
import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ChevronRight, 
  Palette,
  X,
  Menu ,
  Rocket,
  Users
} from "lucide-react";
import AuthButtons from "./AuthButtons";
import { label, path } from "framer-motion/client";

const DesktopNav = ({ 
  location, 
  navigate, 
  isMegaMenuOpen, 
  setIsMegaMenuOpen,
  setIsMenuOpen,
  theme 
}) => {
  const navItems = [
    { path: "/", label: "Home", icon: <Rocket size={18} /> },
    { path: "/about", label: "About", icon: <Users size={18} /> },
    { path: "/new", label: "New Arrivals", icon: <Sparkles size={18} /> },
    { path: "/contact", label: "Contact", icon: <Users size={18}/> }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden lg:flex items-center gap-8">
      {/* Features Mega Menu Trigger */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative"
        onMouseEnter={() => setIsMegaMenuOpen(true)}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all group ${
          theme === 'dark'
            ? 'hover:bg-gray-800/50 text-gray-300'
            : 'hover:bg-gray-100/50 text-gray-700'
        }`}>
          <Sparkles size={16} className="text-purple-500" />
          <span className="font-semibold">Features</span>
          <ChevronRight
            size={16}
            className={`transition-transform group-hover:rotate-90 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
            } group-hover:text-purple-500`}
          />
        </button>

        {/* Active Indicator */}
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          initial={false}
          animate={isMegaMenuOpen ? { opacity: 1 } : { opacity: 0 }}
        />
      </motion.div>

      {/* Main Navigation Items */}
      {navItems.map((item) => (
        <motion.div
          key={item.path}
          whileHover={{ scale: 1.05 }}
          className="relative"
          onClick={() => navigate(item.path)}
        >
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isActive(item.path)
                ? theme === 'dark'
                  ? 'text-purple-300 bg-purple-900/30'
                  : 'text-purple-600 bg-purple-50'
                : theme === 'dark'
                  ? 'text-gray-300 hover:text-purple-300 hover:bg-gray-800/50'
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-100/50'
            }`}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </button>

          {/* Active Indicator */}
          {isActive(item.path) && (
            <motion.div
              layoutId="activeNav"
              className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          )}
        </motion.div>
      ))}

      {/* Auth Buttons & CTA */}
      <AuthButtons navigate={navigate} theme={theme} />
    </div>
  );
};

export default DesktopNav;