import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const Logo = ({ navigate }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center">
          <ShoppingBag size={24} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 animate-pulse" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          CommercePro
        </h1>
        <p className="text-xs text-gray-500">AI-Powered E-commerce</p>
      </div>
    </motion.div>
  );
};

export default Logo;