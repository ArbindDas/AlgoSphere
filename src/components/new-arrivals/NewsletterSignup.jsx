

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const NewsletterSignup = ({ theme: propTheme }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");
      
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className={`backdrop-blur-xl rounded-3xl p-8 md:p-12 border shadow-2xl ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/50 border-gray-700/50 shadow-black/20'
          : 'bg-gradient-to-br from-white/90 to-purple-50/50 border-white/40 shadow-black/5'
      }`}>
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex p-4 rounded-2xl mb-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20'
              : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10'
          }`}
        >
          <Send className={`w-8 h-8 ${
            theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
          }`} />
        </motion.div>

        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Never Miss a New Arrival
        </h2>
        
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Get notified first when new products arrive. Exclusive early access and launch offers for subscribers.
        </p>

        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`border rounded-2xl p-6 max-w-md mx-auto ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-800/30'
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
            }`}
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}>
              Successfully Subscribed!
            </h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              You'll be the first to know about our latest arrivals. Check your email for confirmation.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={`flex-1 px-6 py-4 rounded-xl border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  theme === 'dark' ? 'shadow-purple-900/40 hover:shadow-purple-900/60' : 'shadow-purple-500/30'
                }`}
              >
                <Send className="w-5 h-5" />
                Get Early Access
              </motion.button>
            </div>
            
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              By subscribing, you agree to receive new arrival notifications and exclusive offers.
              You can unsubscribe at any time.
            </p>
          </form>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-8 border-t">
          {[
            {
              emoji: "📱",
              title: "Mobile App Priority",
              desc: "Early access on our mobile app"
            },
            {
              emoji: "🎁",
              title: "Exclusive Discounts",
              desc: "Special launch prices for subscribers"
            },
            {
              emoji: "⭐",
              title: "VIP Treatment",
              desc: "Priority customer support"
            }
          ].map((benefit, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30'
                  : 'bg-white/50 hover:bg-white/70 border border-gray-200/50'
              } transition-colors`}
            >
              <div className="text-lg mb-1">{benefit.emoji}</div>
              <h4 className={`font-semibold mb-1 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {benefit.title}
              </h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;