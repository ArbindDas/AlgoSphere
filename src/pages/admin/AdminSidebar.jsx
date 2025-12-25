import React, { useState } from 'react';
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  BarChart3, Settings, LogOut, Bell, ChevronDown, ChevronRight, Moon, Sun
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'products', label: 'Products', icon: Package, badge: '24' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: '12', badgeColor: 'bg-red-500' },
    { id: 'customers', label: 'Customers', icon: Users, badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-72'} ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      } border-r min-h-screen transition-all duration-300 flex flex-col relative`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg z-10"
      >
        <ChevronRight size={14} className={`transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>

      {/* Logo Section */}
      <div className="p-6 mb-4 flex items-center justify-between">
        {!isCollapsed ? (
          <>
            <div>
              <h2 className={`text-2xl font-bold ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
                  : 'text-blue-600'
              }`}>
                AdminPanel
              </h2>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                E-commerce Hub
              </p>
            </div>
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-gray-600" />
              )}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                : 'bg-blue-600'
            }`}>
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {/* Theme Toggle for Collapsed */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-1.5 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? (
                <Sun size={14} className="text-yellow-400" />
              ) : (
                <Moon size={14} className="text-gray-600" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Notifications Banner (only when expanded) */}
      {!isCollapsed && (
        <div className={`mx-4 mb-6 p-4 rounded-xl ${
          isDarkMode 
            ? 'bg-blue-500/10 border border-blue-500/20'
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
            }`}>
              <Bell size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                3 New Orders
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Requires attention
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group relative ${
              activeTab === item.id
                ? isDarkMode
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            {/* Active Indicator */}
            {activeTab === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
            )}
            
            <item.icon 
              size={20} 
              className={`${isCollapsed ? 'mx-auto' : ''} ${
                activeTab === item.id 
                  ? 'text-white' 
                  : isDarkMode 
                    ? 'text-slate-400 group-hover:text-white'
                    : 'text-gray-500 group-hover:text-gray-900'
              }`}
            />
            
            {!isCollapsed && (
              <>
                <span className="font-medium flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`${item.badgeColor || (isDarkMode ? 'bg-slate-600' : 'bg-gray-300')} text-white text-xs px-2 py-0.5 rounded-full font-semibold`}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
            
            {/* Badge indicator when collapsed */}
            {isCollapsed && item.badge && (
              <div className={`absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 ${
                isDarkMode ? 'border-slate-900' : 'border-white'
              }`} />
            )}
          </button>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              isCollapsed ? 'justify-center' : ''
            } ${
              isDarkMode 
                ? 'bg-slate-700/50 hover:bg-slate-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                : 'bg-blue-600'
            }`}>
              <span className="text-white font-bold">
                {(user?.name || 'A').charAt(0).toUpperCase()}
              </span>
            </div>
            
            {!isCollapsed && (
              <>
                <div className="flex-1 text-left">
                  <p className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name || 'Admin User'}
                  </p>
                  <p className={`text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${
                    showUserMenu ? 'rotate-180' : ''
                  } ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}
                />
              </>
            )}
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && !isCollapsed && (
            <div className={`absolute bottom-full left-0 right-0 mb-2 rounded-xl shadow-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700'
                : 'bg-white border border-gray-200'
            }`}>
              <button className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                isDarkMode 
                  ? 'hover:bg-slate-700 text-slate-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
              }`}>
                <Settings size={16} />
                <span className="text-sm">Account Settings</span>
              </button>
              <button className={`w-full flex items-center gap-3 px-4 py-3 transition-colors border-t ${
                isDarkMode 
                  ? 'hover:bg-slate-700 text-red-400 hover:text-red-300 border-slate-700'
                  : 'hover:bg-gray-100 text-red-600 hover:text-red-700 border-gray-200'
              }`}>
                <LogOut size={16} />
                <span className="text-sm">Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default AdminSidebar;

