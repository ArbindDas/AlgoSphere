import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    shoppingHelp: ['Order Status', 'Shipping Info', 'Returns & Exchanges', 'Size Guide'],
    security: ['Privacy Policy', 'Terms of Sale', 'Secure Shopping', 'Cookie Policy'],
    payments: ['Visa', 'MasterCard', 'Amex', 'PayPal']
  };

  return (
    <footer className="relative z-10 bg-linear-to-b from-white/90 via-white/80 to-white border-t border-gray-200/50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-green-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                ShopSecure
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Your trusted shopping destination. Secure payments, fast shipping, and exceptional customer support.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Shopping Help</h4>
            <ul className="space-y-2">
              {footerLinks.shoppingHelp.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Security & Privacy</h4>
            <ul className="space-y-2">
              {footerLinks.security.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Accepted Payments</h4>
            <div className="flex flex-wrap gap-2">
              {footerLinks.payments.map((method) => (
                <div key={method} className="px-3 py-1 bg-gray-100 rounded-lg">
                  <span className="text-xs font-medium text-gray-600">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200/50 text-center">
          <p className="text-sm text-gray-600">
            © 2024 ShopSecure. All rights reserved. |{' '}
            <span className="text-emerald-600 font-medium">100% Secure Shopping Guarantee</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            All transactions are protected by SSL encryption and PCI-DSS compliance
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;