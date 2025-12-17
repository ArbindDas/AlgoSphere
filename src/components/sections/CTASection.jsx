import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CTASection = () => {


   const navigate = useNavigate(); 

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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-10" />
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/40 shadow-2xl shadow-black/5">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Start Shopping Smart Today
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join millions of satisfied customers who trust us for their
                shopping needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/signup")}
                  className="px-10 py-5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Create Free Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/products")}
                  className="px-10 py-5 rounded-xl bg-white border border-gray-300 text-gray-800 font-semibold text-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Browse Products
                </motion.button>
              </div>
              <p className="text-sm text-gray-500 mt-8">
                🛡️ Secure checkout • 🚚 Free shipping over $50 • 🔄 30-day
                returns
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
