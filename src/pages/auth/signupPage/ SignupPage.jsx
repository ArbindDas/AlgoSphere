

import React from "react";
import { motion } from "framer-motion";
import AuthBackground from "../../../components/AuthBackground";
import SignupForm from "./components/SignupForm";
import BenefitsSection from "./components/BenefitsSection";
import { useTheme } from "../../../context/ThemeContext";

export const SignupPage = () => {
  const { theme } = useTheme();

  // Theme-based styles
  const pageBg = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800'
    : 'bg-gradient-to-br from-emerald-50 via-white to-cyan-50';

  const floatingElement1 = theme === 'dark'
    ? 'bg-emerald-900/5'
    : 'bg-emerald-300/10';

  const floatingElement2 = theme === 'dark'
    ? 'bg-cyan-900/5'
    : 'bg-cyan-300/10';

  return (
    <div className={`min-h-screen relative overflow-hidden pt-20 sm:pt-36 lg:pt-20 pb-15 px-4 ${pageBg}`}>
      {/* Background */}
      <AuthBackground type="signup" />
      
      {/* Floating Elements */}
      <div className={`fixed top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${floatingElement1}`} />
      <div className={`fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${floatingElement2}`} />

      {/* Main content with navbar padding */}
      <div className="relative pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="max-w-md mx-auto">
                <SignupForm />
              </div>
            </motion.div>

            {/* Right Side - Benefits & Features */}
            <BenefitsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;