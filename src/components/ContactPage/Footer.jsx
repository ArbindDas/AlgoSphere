
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = ({ theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  const footerLinks = {
    shoppingHelp: ['Order Status', 'Shipping Info', 'Returns & Exchanges', 'Size Guide'],
    security: ['Privacy Policy', 'Terms of Sale', 'Secure Shopping', 'Cookie Policy'],
    payments: ['Visa', 'MasterCard', 'Amex', 'PayPal']
  };

  return (
    <footer className={`relative z-10 px-6 py-12 border-t ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900/90 via-gray-800/80 to-gray-900 border-gray-800/50'
        : 'bg-gradient-to-b from-white/90 via-white/80 to-white border-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-emerald-700 to-green-600'
                  : 'bg-gradient-to-br from-emerald-600 to-green-500'
              }`}>
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold bg-clip-text text-transparent ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-emerald-400 to-green-400'
                  : 'bg-gradient-to-r from-emerald-600 to-green-500'
              }`}>
                ShopSecure
              </span>
            </div>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Your trusted shopping destination. Secure payments, fast shipping, and exceptional customer support.
            </p>
          </div>
          
          {/* Shopping Help Links */}
          <div>
            <h4 className={`font-bold mb-4 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Shopping Help
            </h4>
            <ul className="space-y-2">
              {footerLinks.shoppingHelp.map((item) => (
                <li key={item}>
                  <a href="#" className={`text-sm transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-emerald-400'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Security Links */}
          <div>
            <h4 className={`font-bold mb-4 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Security & Privacy
            </h4>
            <ul className="space-y-2">
              {footerLinks.security.map((item) => (
                <li key={item}>
                  <a href="#" className={`text-sm transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-emerald-400'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Payment Methods */}
          <div>
            <h4 className={`font-bold mb-4 ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Accepted Payments
            </h4>
            <div className="flex flex-wrap gap-2">
              {footerLinks.payments.map((method) => (
                <div key={method} className={`px-3 py-1 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border border-gray-700/50'
                    : 'bg-gray-100'
                }`}>
                  <span className={`text-xs font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {method}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className={`pt-8 border-t text-center ${
          theme === 'dark' ? 'border-gray-800/50' : 'border-gray-200/50'
        }`}>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © 2024 ShopSecure. All rights reserved. |{' '}
            <span className={`font-medium ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              100% Secure Shopping Guarantee
            </span>
          </p>
          <p className={`text-xs mt-2 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            All transactions are protected by SSL encryption and PCI-DSS compliance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;