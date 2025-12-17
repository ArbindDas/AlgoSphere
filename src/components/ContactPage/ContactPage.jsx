

import React, { useState } from 'react';
import { ShieldCheck, Headphones, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ThreeBackground from './ThreeBackground';
import ShoppingGlobe from './ShoppingGlobe';
import ContactCards from './ContactCards';
import SecurityFeatures from './SecurityFeatures';
import ShoppingAssurance from './ShoppingAssurance';
import FAQSection from './FAQSection';
import StatsSection from './StatsSection';
import ContactModal from './ContactModal';
import Footer from './Footer';
import TypingEffect from '../shared/TypingEffect';
import { contactCards, faqItems, securityFeatures } from '../../utils/constants';

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();
  
  const phrases = ["Need Help?", "Order Questions?", "Track Your Package", "Secure Shopping!"];

  return (
    <div className={`relative min-h-screen overflow-hidden ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-emerald-50 via-blue-50/30 to-amber-50/20'
    }`}>
      <ThreeBackground theme={theme} />
      <ShoppingGlobe theme={theme} />
      
      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-emerald-900/20 to-green-900/20 text-emerald-300 border-emerald-700/30'
                  : 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700 border-emerald-200/50'
              }`}>
                <ShieldCheck className="w-4 h-4" />
                100% Secure Shopping Guaranteed
              </div>
              
              {/* Title */}
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                <span className="block">Shopping Support</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
                  <TypingEffect phrases={phrases} />
                </span>
              </h1>
              
              {/* Description */}
              <p className={`text-xl mb-8 max-w-2xl leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Your satisfaction is our priority. Get help with orders, track packages, resolve payment issues, or ask about our buyer protection.
              </p>

              {/* Security Features */}
              <SecurityFeatures features={securityFeatures} theme={theme} />
              
              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all inline-flex items-center gap-3 group"
              >
                <Headphones className="w-5 h-5" />
                Get Help Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Contact Cards */}
            <ContactCards 
              cards={contactCards} 
              onCardClick={() => setIsModalOpen(true)}
              theme={theme}
            />
          </div>
        </div>
      </section>

      {/* Sections with theme props */}
      <ShoppingAssurance theme={theme} />
      <FAQSection items={faqItems} theme={theme} />
      <StatsSection theme={theme} />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        theme={theme}
      />
      
      {/* Footer */}
      <Footer theme={theme} />
    </div>
  );
};

export default ContactPage;