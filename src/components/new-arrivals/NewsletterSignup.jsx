import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");
      
      // Reset after 3 seconds
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
      <div className="bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/40 shadow-2xl shadow-black/5">
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 mb-6"
        >
          <Send className="w-8 h-8 text-purple-600" />
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Never Miss a New Arrival
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Get notified first when new products arrive. Exclusive early access and launch offers for subscribers.
        </p>

        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 max-w-md mx-auto"
          >
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Successfully Subscribed!</h3>
            <p className="text-gray-600">
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
                className="flex-1 px-6 py-4 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Get Early Access
              </motion.button>
            </div>
            
            <p className="text-sm text-gray-500">
              By subscribing, you agree to receive new arrival notifications and exclusive offers.
              You can unsubscribe at any time.
            </p>
          </form>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-200/50">
          <div className="p-4 rounded-xl bg-white/50">
            <div className="text-lg mb-1">📱</div>
            <h4 className="font-semibold text-gray-800 mb-1">Mobile App Priority</h4>
            <p className="text-sm text-gray-600">Early access on our mobile app</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50">
            <div className="text-lg mb-1">🎁</div>
            <h4 className="font-semibold text-gray-800 mb-1">Exclusive Discounts</h4>
            <p className="text-sm text-gray-600">Special launch prices for subscribers</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50">
            <div className="text-lg mb-1">⭐</div>
            <h4 className="font-semibold text-gray-800 mb-1">VIP Treatment</h4>
            <p className="text-sm text-gray-600">Priority customer support</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;