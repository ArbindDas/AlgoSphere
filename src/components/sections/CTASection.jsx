

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CTASection = ({ theme: propTheme }) => {
  const navigate = useNavigate();
  
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  return (
    <>
      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background glow */}
            <div className={`absolute inset-0 rounded-3xl blur-3xl opacity-10 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-700 to-purple-700'
                : 'bg-gradient-to-br from-blue-500 to-purple-500'
            }`} />
            
            {/* Main card */}
            <div className={`relative backdrop-blur-xl rounded-3xl p-12 md:p-16 border shadow-2xl ${
              theme === 'dark'
                ? 'bg-gray-800/95 border-gray-700/50 shadow-black/20'
                : 'bg-white/95 border-white/40 shadow-black/5'
            }`}>
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Start Shopping Smart Today
              </h2>
              <p className={`text-xl mb-10 max-w-2xl mx-auto ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Join millions of satisfied customers who trust us for their
                shopping needs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Primary CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/signup")}
                  className={`px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                    theme === 'dark'
                      ? 'shadow-blue-900/40 hover:shadow-blue-900/60'
                      : 'shadow-blue-500/30 hover:shadow-blue-500/40'
                  }`}
                >
                  Create Free Account
                </motion.button>
                
                {/* Secondary CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/products")}
                  className={`px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                    theme === 'dark'
                      ? 'bg-gray-700/80 border border-gray-600 text-gray-200 hover:bg-gray-600/80 hover:border-gray-500'
                      : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-blue-300'
                  }`}
                >
                  Browse Products
                </motion.button>
              </div>
              
              {/* Features list */}
              <p className={`text-sm mt-8 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                🛡️ Secure checkout • 🚚 Free shipping over $50 • 🔄 30-day returns
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CTASection;