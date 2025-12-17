// components/AIShoppingAssistant.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Search } from "lucide-react";

const AIShoppingAssistant = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Gaming laptops under $1000",
    "Wireless headphones for running",
    "Organic skincare products",
    "Smart home devices",
    "Fitness trackers with heart rate"
  ]);

   return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200">
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-sm font-semibold text-blue-600">AI SHOPPING ASSISTANT</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Need Help Finding Products?
            </h3>
            <p className="text-gray-600 mb-6">
              Our AI assistant learns your preferences and suggests products you'll love. Just tell us what you're looking for!
            </p>
            
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe what you're looking for..."
                className="w-full px-6 py-4 pr-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
  
            <div className="flex flex-wrap gap-2 mt-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(suggestion)}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
  
          <div className="flex-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">AI Suggestions</h4>
                  <p className="text-sm text-gray-500">Based on your interests</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { category: "Electronics", match: "95%" },
                  { category: "Fashion", match: "88%" },
                  { category: "Home & Living", match: "82%" },
                  { category: "Beauty", match: "76%" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm font-semibold text-blue-600">{item.match} match</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
};

export default AIShoppingAssistant;