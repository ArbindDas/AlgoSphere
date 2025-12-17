import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Clock, Gift } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { value: '1M+', label: 'Happy Customers', icon: Users },
    { value: '99%', label: 'Order Accuracy', icon: CheckCircle },
    { value: '24/7', label: 'Support Available', icon: Clock },
    { value: '30-day', label: 'Return Policy', icon: Gift }
  ];

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="bg-linear-to-r from-emerald-600 to-green-500 rounded-3xl p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="flex items-center justify-center gap-2">
                  <stat.icon className="w-5 h-5" />
                  <p className="text-emerald-100">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;