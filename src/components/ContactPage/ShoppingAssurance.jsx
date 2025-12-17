import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck } from 'lucide-react';

const ShoppingAssurance = () => {
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
          className="bg-linear-to-br from-white via-emerald-50/30 to-green-50/20 rounded-3xl p-12 shadow-2xl border border-gray-200/50 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Truck className="w-4 h-4" />
                Fast & Reliable Shipping
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Purchase is Protected
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We ensure every transaction is secure and every delivery is tracked.
              </p>
              <div className="space-y-4">
                {shippingInfo.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-200/50">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/80 rounded-2xl p-8 border border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Regional Support Centers</h3>
              <div className="space-y-6">
                {offices.map((office, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 hover:bg-gray-50/50 rounded-xl transition-colors">
                    <div className="w-12 h-12 bg-linear-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{office.city}</h4>
                      <p className="text-sm text-gray-600">{office.address}</p>
                      <p className="text-sm text-emerald-600 mt-1 font-medium">{office.hours}</p>
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