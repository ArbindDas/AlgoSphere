

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ThreeBackground from "../components/ContactPage/ThreeBackground";
import ShoppingGlobe from '../components/ContactPage/ShoppingGlobe';
import ContactCards from '../components/ContactPage/ContactCards';
import SecurityFeatures from '../components/ContactPage/SecurityFeatures';
import ShoppingAssurance from '../components/ContactPage/ShoppingAssurance';
import FAQSection from '../components/ContactPage/FAQSection';
import StatsSection from '../components/ContactPage/StatsSection';
import ContactModal from '../components/ContactPage/ContactModal';
import Footer from '../components/ContactPage/Footer';
import TypingEffect from '../components/ContactPage/TypingEffect';
import { contactCards, faqItems, securityFeatures } from '../components/utils/constants';

import { 
  Headphones,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();
  
  const phrases = ["Need Help?", "Order Questions?", "Track Your Package", "Secure Shopping!"];

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
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
              {/* Security Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border transition-colors ${
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
                  <TypingEffect phrases={phrases} theme={theme} />
                </span>
              </h1>
              
              {/* Description */}
              <p className={`text-xl mb-8 max-w-2xl leading-relaxed transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Your satisfaction is our priority. Get help with orders, track packages, resolve payment issues, or ask about our buyer protection.
              </p>

              {/* Security Features */}
              <SecurityFeatures features={securityFeatures} theme={theme} />
              
              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className={`bg-gradient-to-r from-emerald-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3 group ${
                  theme === 'dark' 
                    ? 'hover:shadow-emerald-900/40' 
                    : 'hover:shadow-emerald-500/30'
                }`}
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

      {/* Shopping Assurance Section */}
      <ShoppingAssurance theme={theme} />
      
      {/* FAQ Section */}
      <FAQSection items={faqItems} theme={theme} />
      
      {/* Stats Section */}
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