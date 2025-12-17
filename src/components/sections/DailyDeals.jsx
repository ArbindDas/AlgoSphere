import { motion } from "framer-motion";
import { Tag } from "lucide-react";

const DailyDeals = () => {
  return (
    <>
      {/* Daily Deals Banner */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />

            <div className="relative p-12 text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm">
                <Tag size={16} className="text-red-500" />
                <span className="font-semibold text-red-600">
                  FLASH SALE ENDS IN: 23:59:59
                </span>
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Daily Deals & Discounts
              </h3>

              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Don't miss out on limited-time offers! Up to 70% off on selected items
              </p>

              <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300">
                Shop Deals Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DailyDeals;
