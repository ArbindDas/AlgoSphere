

// Sidebar.jsx
import React from 'react';
import { 
  Key, User, Plus, Home, Settings, Shield, 
  Bell, Activity, LogOut, CheckCircle,
  LayoutDashboard, Moon, Sun
} from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ activeTab, setActiveTab, userProfile }) => {
  const { theme, toggleTheme } = useTheme();
  
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Complete overview',
      color: 'from-indigo-500 to-purple-600',
      showBadge: false
    },
    {
      id: 'keycloak',
      label: 'Keycloak Profile',
      icon: Key,
      description: 'Authentication info',
      color: 'from-blue-500 to-blue-600',
      showBadge: false
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      description: 'Complete profile',
      color: userProfile ? 'from-green-500 to-green-600' : 'from-gray-400 to-gray-500',
      showBadge: userProfile ? '✓ Created' : '✗ Not created'
    },
    {
      id: 'create',
      label: 'Create Profile',
      icon: Plus,
      description: 'Setup complete profile',
      color: 'from-purple-500 to-purple-600',
      showBadge: userProfile ? '✓ Created' : null
    }
  ];

  // Quick actions now navigate to dedicated pages
  const quickActions = [
    { 
      id: 'settings',
      icon: Settings, 
      label: 'Settings',
      description: 'Account preferences',
      color: 'from-gray-500 to-gray-600'
    },
    { 
      id: 'security',
      icon: Shield, 
      label: 'Security',
      description: 'Security & privacy',
      color: 'from-red-500 to-orange-500'
    },
    { 
      id: 'notifications',
      icon: Bell, 
      label: 'Notifications',
      description: 'Alerts & notifications',
      color: 'from-yellow-500 to-amber-500'
    },
    { 
      id: 'activity',
      icon: Activity, 
      label: 'Activity Log',
      description: 'Recent activities',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  // Handle navigation to quick action pages
  const handleQuickActionClick = (actionId) => {
    setActiveTab(actionId);
  };

  // Theme-specific colors
  const bgColor = theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95';
  const borderColor = theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const hoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  const activeBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-purple-50';
  const activeBorder = theme === 'dark' ? 'border-gray-600' : 'border-blue-100';

  return (
    <div className={`w-64 h-screen ${bgColor} backdrop-blur-sm border-r ${borderColor} fixed left-0 top-0 flex flex-col shadow-xl transition-colors duration-300`}>
      {/* Logo/Brand with Theme Toggle */}
      <div className={`p-6 border-b ${borderColor}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <div>
              <h2 className={`font-bold ${textColor}`}>User Dashboard</h2>
              <p className="text-xs text-gray-500">Complete Profile Management</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Profile Summary */}
      <div className={`p-6 border-b ${borderColor}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            theme === 'dark' 
              ? 'bg-gray-800' 
              : 'bg-gradient-to-br from-blue-100 to-purple-100'
          }`}>
            <User size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
          </div>
          <div>
            <p className={`font-semibold ${textColor}`}>Profile Status</p>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${userProfile ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {userProfile ? 'Complete' : 'Incomplete'}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={textSecondary}>Keycloak Profile</span>
            <CheckCircle size={14} className="text-green-500" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={textSecondary}>User Profile</span>
            {userProfile ? (
              <CheckCircle size={14} className="text-green-500" />
            ) : (
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={textSecondary}>Addresses</span>
            {userProfile?.addresses?.length > 0 ? (
              <span className={`text-xs px-2 py-1 rounded-full ${
                theme === 'dark' 
                  ? 'bg-blue-900/50 text-blue-300' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {userProfile.addresses.length} added
              </span>
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className={`text-xs font-semibold ${textSecondary} uppercase tracking-wider mb-4 px-2`}>
          Main Sections
        </p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                  ? `${activeBg} border ${activeBorder}` 
                  : hoverBg
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon size={18} className="text-white" />
                </div>
                <div className="text-left">
                  <p className={`font-medium ${textColor}`}>{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              {item.showBadge && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.showBadge.includes('✓') 
                    ? theme === 'dark'
                      ? 'bg-green-900/50 text-green-300'
                      : 'bg-green-100 text-green-800'
                    : theme === 'dark'
                      ? 'bg-yellow-900/50 text-yellow-300'
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.showBadge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <p className={`text-xs font-semibold ${textSecondary} uppercase tracking-wider mt-8 mb-4 px-2`}>
          Quick Actions
        </p>
        <div className="space-y-1">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickActionClick(action.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                activeTab === action.id 
                  ? `${activeBg} border ${activeBorder}` 
                  : hoverBg
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className={`font-medium ${textColor}`}>{action.label}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer with Logout */}
      <div className={`p-4 border-t ${borderColor}`}>
        <button 
          onClick={() => {
            localStorage.removeItem('keycloak_auth');
            localStorage.removeItem('access_token');
            window.location.href = '/login';
          }}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
            theme === 'dark'
              ? 'hover:bg-red-900/20 text-red-400'
              : 'hover:bg-red-50 text-red-600'
          }`}
        >
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;