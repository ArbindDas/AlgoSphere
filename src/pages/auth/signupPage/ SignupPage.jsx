import React from "react";
import { motion } from "framer-motion";
import AuthBackground from "../../../components/AuthBackground";
import SignupForm from "./components/SignupForm";
import BenefitsSection from "./components/BenefitsSection";

export const SignupPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background */}
      <AuthBackground type="signup" />
      
      {/* Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl" />

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