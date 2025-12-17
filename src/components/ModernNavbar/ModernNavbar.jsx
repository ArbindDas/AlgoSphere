import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import NavBackground from "./NavBackground";
import MegaMenu from "./MegaMenu";
import FloatingActionButton from "./FloatingActionButton";
import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import { 
  Rocket, 
  Users, 
  Sparkles, 
  LogIn, 
  UserPlus,
  X,
  Menu
} from "lucide-react"

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl -z-10" />
      <div className="fixed top-10 right-10 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl -z-10" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-2xl shadow-black/10 border border-white/40"
            : "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/30"
        } rounded-2xl`}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo navigate={navigate} />
            
            {/* Desktop Navigation */}
            <DesktopNav 
              location={location}
              navigate={navigate}
              isMegaMenuOpen={isMegaMenuOpen}
              setIsMegaMenuOpen={setIsMegaMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
            
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center"
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
        />
      </motion.nav>

      {/* Mega Menu */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Three.js Background Effect */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl h-20 -z-10 rounded-2xl overflow-hidden">
        <NavBackground />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 z-50 origin-left"
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