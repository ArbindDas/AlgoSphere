import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
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
  
  const phrases = ["Need Help?", "Order Questions?", "Track Your Package", "Secure Shopping!"];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-emerald-50 via-blue-50/30 to-amber-50/20 overflow-hidden">
      <ThreeBackground />
      <ShoppingGlobe />
      
      <Navbar onContactClick={() => setIsModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-500/10 to-green-500/10 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-200/50">
                <ShieldCheck className="w-4 h-4" />
                100% Secure Shopping Guaranteed
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">Shopping Support</span>
                <span className="block bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  <TypingEffect phrases={phrases} />
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Your satisfaction is our priority. Get help with orders, track packages, resolve payment issues, or ask about our buyer protection.
              </p>

              <SecurityFeatures features={securityFeatures} />
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-linear-to-r from-emerald-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all inline-flex items-center gap-3"
              >
                <Headphones className="w-5 h-5" />
                Get Help Now
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <ContactCards cards={contactCards} onCardClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </section>

      <ShoppingAssurance />
      <FAQSection items={faqItems} />
      <StatsSection />
      
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default ContactPage;