


import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Search } from "lucide-react";
import { useTheme }  from "../context/ThemeContext"

const AIShoppingAssistant = () => {
  const [query, setQuery] = useState("");
  const { theme } = useTheme();
  
  const [suggestions, setSuggestions] = useState([
    "Gaming laptops under $1000",
    "Wireless headphones for running",
    "Organic skincare products",
    "Smart home devices",
    "Fitness trackers with heart rate"
  ]);

  // Theme-based styles
  const containerBg = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
    : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100';

  const badgeBg = theme === 'dark'
    ? 'bg-gray-800/80 backdrop-blur-sm border-gray-600'
    : 'bg-white/80 backdrop-blur-sm border-blue-200';

  const badgeText = theme === 'dark'
    ? 'text-blue-400'
    : 'text-blue-600';

  const titleColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const descriptionColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';

  const inputBg = theme === 'dark'
    ? 'bg-gray-800/80 text-gray-100 border-gray-600 placeholder-gray-400'
    : 'bg-white/80 text-gray-900 border-gray-300 placeholder-gray-500';

  const inputFocus = theme === 'dark'
    ? 'focus:border-blue-500 focus:ring-blue-500/30'
    : 'focus:border-blue-500 focus:ring-blue-200';

  const suggestionButtonBg = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400'
    : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600';

  const aiCardBg = theme === 'dark'
    ? 'bg-gray-800/90 backdrop-blur-xl border-gray-700'
    : 'bg-white/90 backdrop-blur-xl border-white/40';

  const aiCardTitle = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const aiCardSubtitle = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-500';

  const suggestionItemBg = theme === 'dark'
    ? 'bg-gray-700/50 text-gray-300'
    : 'bg-gray-50 text-gray-700';

  const matchTextColor = theme === 'dark'
    ? 'text-blue-400'
    : 'text-blue-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-3xl p-8 md:p-12 border ${containerBg}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="flex-1">
          <div className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full backdrop-blur-sm border ${badgeBg}`}>
            <Sparkles size={16} className="text-blue-500" />
            <span className={`text-sm font-semibold ${badgeText}`}>AI SHOPPING ASSISTANT</span>
          </div>
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${titleColor}`}>
            Need Help Finding Products?
          </h3>
          <p className={`mb-6 ${descriptionColor}`}>
            Our AI assistant learns your preferences and suggests products you'll love. Just tell us what you're looking for!
          </p>
          
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you're looking for..."
              className={`w-full px-6 py-4 pr-12 rounded-xl border outline-none transition-all backdrop-blur-sm ${inputBg} ${inputFocus}`}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${suggestionButtonBg}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className={`rounded-2xl p-6 border shadow-lg ${aiCardBg}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h4 className={`font-bold ${aiCardTitle}`}>AI Suggestions</h4>
                <p className={`text-sm ${aiCardSubtitle}`}>Based on your interests</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { category: "Electronics", match: "95%" },
                { category: "Fashion", match: "88%" },
                { category: "Home & Living", match: "82%" },
                { category: "Beauty", match: "76%" }
              ].map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${suggestionItemBg}`}>
                  <span className="font-medium">{item.category}</span>
                  <span className={`text-sm font-semibold ${matchTextColor}`}>{item.match} match</span>
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