

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ShoppingAssurance = ({ theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  const shippingInfo = [
    { label: 'Order Processing', time: 'Within 24 hours', icon: '⚡' },
    { label: 'Standard Shipping', time: '3-5 business days', icon: '🚚' },
    { label: 'Express Delivery', time: '1-2 business days', icon: '✈️' },
    { label: 'Free Returns', time: '30-day window', icon: '🔄' }
  ];

  const offices = [
    { city: 'US Headquarters', address: '123 Commerce St, NY 10013', hours: '24/7 Support' },
    { city: 'European Hub', address: '45 Business Ave, London EC2A', hours: '8AM-10PM CET' },
    { city: 'Asia Pacific', address: '10 Marina Blvd, Singapore', hours: '24/7 Support' },
    { city: 'Australia', address: '1 Martin Place, Sydney', hours: '24/7 Support' }
  ];

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`rounded-3xl p-12 shadow-2xl backdrop-blur-sm ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-900 via-gray-800/30 to-gray-900 border border-gray-700/50'
              : 'bg-gradient-to-br from-white via-emerald-50/30 to-green-50/20 border border-gray-200/50'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-300 border border-blue-700/30'
                  : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-700'
              }`}>
                <Truck className="w-4 h-4" />
                Fast & Reliable Shipping
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Your Purchase is Protected
              </h2>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We ensure every transaction is secure and every delivery is tracked.
              </p>
              
              {/* Shipping Info Cards */}
              <div className="space-y-4">
                {shippingInfo.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      theme === 'dark'
                        ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70 hover:border-gray-600'
                        : 'bg-white/50 border-gray-200/50 hover:bg-white/70 hover:border-gray-300'
                    } transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className={`font-semibold ${
                          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {item.label}
                        </p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.time}
                        </p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                    }`} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Regional Support */}
            <div className={`rounded-2xl p-8 border ${
              theme === 'dark'
                ? 'bg-gray-800/80 border-gray-700/50'
                : 'bg-white/80 border-gray-200/50'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Regional Support Centers
              </h3>
              <div className="space-y-6">
                {offices.map((office, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700/50'
                        : 'hover:bg-gray-50/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 border border-emerald-800/30'
                        : 'bg-gradient-to-br from-emerald-100 to-green-100'
                    }`}>
                      <MapPin className={`w-6 h-6 ${
                        theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {office.city}
                      </h4>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {office.address}
                      </p>
                      <p className={`text-sm mt-1 font-medium ${
                        theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        {office.hours}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShoppingAssurance;