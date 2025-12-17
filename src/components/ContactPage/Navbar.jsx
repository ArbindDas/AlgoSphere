import React from 'react';
import { ShoppingBag, Headphones } from 'lucide-react';

const Navbar = ({ onContactClick }) => {
  return (
    <nav className="relative z-20 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-green-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            ShopSecure
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={onContactClick}
            className="bg-linear-to-r from-emerald-600 to-green-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
          >
            <Headphones className="w-4 h-4" />
            Need Help?
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;