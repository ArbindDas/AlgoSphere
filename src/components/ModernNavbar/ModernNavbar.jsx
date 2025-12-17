

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import NavBackground from "./NavBackground";
import MegaMenu from "./MegaMenu";
import FloatingActionButton from "./FloatingActionButton";
import MobileMenu from "./MobileMenu"
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import { useTheme } from "../../context/ThemeContext"
import { 
  Rocket, 
  Users, 
  Sparkles, 
  LogIn, 
  UserPlus,
  X,
  Menu,
  Sun,
  Moon
} from "lucide-react"

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Get theme context

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Elements - Add dark mode variants */}
      <div className={`fixed top-20 left-10 w-72 h-72 rounded-full blur-3xl -z-10 ${
        theme === 'dark' 
          ? 'bg-purple-500/5' 
          : 'bg-purple-300/10'
      }`} />
      <div className={`fixed top-10 right-10 w-96 h-96 rounded-full blur-3xl -z-10 ${
        theme === 'dark'
          ? 'bg-pink-500/5'
          : 'bg-pink-300/10'
      }`} />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl z-50 transition-all duration-500 ${
          isScrolled
            ? theme === 'dark'
              ? "bg-gray-900/90 backdrop-blur-2xl shadow-2xl shadow-black/30 border border-gray-800/40"
              : "bg-white/90 backdrop-blur-2xl shadow-2xl shadow-black/10 border border-white/40"
            : theme === 'dark'
              ? "bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/20 border border-gray-800/30"
              : "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/30"
        } rounded-2xl`}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo navigate={navigate} theme={theme} />
            
            {/* Desktop Navigation */}
            <DesktopNav 
              location={location}
              navigate={navigate}
              isMegaMenuOpen={isMegaMenuOpen}
              setIsMegaMenuOpen={setIsMegaMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              theme={theme}
            />
            
            {/* Theme Toggle and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === 'dark'
                    ? 'bg-gray-800 border border-gray-700 text-yellow-300'
                    : 'bg-gray-100 border border-gray-300 text-yellow-600'
                }`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center lg:hidden ${
                  theme === 'dark'
                    ? 'border border-gray-700 text-gray-300'
                    : 'border border-gray-300 text-gray-700'
                }`}
              >
                {isMenuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          location={location}
          navigate={navigate}
          theme={theme}
        />
      </motion.nav>

      {/* Rest of the components... */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        theme={theme}
      />

      <FloatingActionButton theme={theme} />

      {/* Three.js Background Effect */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl h-20 -z-10 rounded-2xl overflow-hidden">
        <NavBackground theme={theme} />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 z-50 origin-left ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700'
            : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500'
        }`}
        style={{
          scaleX: isScrolled
            ? 0.3 + (window.scrollY / (document.body.scrollHeight || 1000)) * 0.7
            : 0,
        }}
      />
    </>
  );
};

export default ModernNavbar;