

// DashboardSection.jsx
import React from 'react';
import { 
  User, Mail, Phone, Cake, MapPin, Home, Building,
  CheckCircle, Shield, Calendar, Clock, Key, AlertCircle,
  Package, ShoppingBag, Heart, Users, Globe, Smartphone,
  Edit, Plus, ChevronRight, Lock, Eye, Bell
} from 'lucide-react';

const DashboardSection = ({ userDetails, userProfile, formatTimestamp, calculateAccountAge, setActiveTab, theme }) => {
  // Theme-specific colors
  const bgColor = theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95';
  const borderColor = theme === 'dark' ? 'border-gray-700/50' : 'border-white/30';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const hoverBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50';
  const cardBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const lightText = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  // Stats cards for dashboard
  const stats = [
    {
      icon: Shield,
      label: "Account Status",
      value: userDetails?.enabled ? "Active" : "Inactive",
      color: "#10b981",
      darkColor: "#34d399",
      description: "Keycloak authentication"
    },
    {
      icon: Mail,
      label: "Email Status",
      value: userDetails?.emailVerified ? "Verified" : "Pending",
      color: userDetails?.emailVerified ? "#10b981" : "#f59e0b",
      darkColor: userDetails?.emailVerified ? "#34d399" : "#fbbf24",
      description: "Email verification"
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: userDetails?.createdTimestamp 
        ? new Date(userDetails.createdTimestamp).getFullYear()
        : "N/A",
      color: "#8b5cf6",
      darkColor: "#a78bfa",
      description: "Account creation year"
    },
    {
      icon: Clock,
      label: "Account Age",
      value: calculateAccountAge(),
      color: "#6366f1",
      darkColor: "#818cf8",
      description: "Time since registration"
    }
  ];

  // User profile stats
  const profileStats = userProfile ? [
    {
      icon: User,
      label: "Profile Status",
      value: "Complete",
      color: "#10b981",
      darkColor: "#34d399",
      description: "Profile created"
    },
    {
      icon: MapPin,
      label: "Addresses",
      value: userProfile.addresses?.length || 0,
      color: "#3b82f6",
      darkColor: "#60a5fa",
      description: "Saved addresses"
    },
    {
      icon: Phone,
      label: "Phone",
      value: userProfile.phoneNumber ? "Added" : "Not set",
      color: userProfile.phoneNumber ? "#10b981" : "#f59e0b",
      darkColor: userProfile.phoneNumber ? "#34d399" : "#fbbf24",
      description: "Contact number"
    },
    {
      icon: Cake,
      label: "Date of Birth",
      value: userProfile.dateOfBirth ? "Set" : "Not set",
      color: userProfile.dateOfBirth ? "#10b981" : "#f59e0b",
      darkColor: userProfile.dateOfBirth ? "#34d399" : "#fbbf24",
      description: "Birth date"
    }
  ] : [];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {userDetails?.firstName || userDetails?.fullName?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-blue-100">
              Here's your complete profile overview
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">Account ID</p>
            <p className="font-mono text-sm">
              {userDetails?.id?.substring(0, 12)}...
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`${bgColor} backdrop-blur-sm rounded-2xl p-5 border ${borderColor} hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                   style={{ 
                     backgroundColor: `${theme === 'dark' ? stat.darkColor : stat.color}${theme === 'dark' ? '20' : '15'}` 
                   }}>
                <stat.icon size={20} style={{ color: theme === 'dark' ? stat.darkColor : stat.color }} />
              </div>
              <div>
                <p className={`text-xs ${textSecondary}`}>{stat.label}</p>
                <p className={`text-xl font-bold ${textColor}`}>{stat.value}</p>
              </div>
            </div>
            <p className={`text-xs ${textSecondary}`}>{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Keycloak Profile */}
        <div className={`${bgColor} backdrop-blur-sm rounded-3xl p-6 border ${borderColor} shadow-xl`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Key size={20} className="text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${textColor}`}>Keycloak Profile</h2>
                <p className={`text-sm ${textSecondary}`}>Authentication & Security</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('keycloak')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              View details
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-lg ${hoverBg} transition-colors duration-300`}>
              <div className="flex items-center gap-3">
                <User size={18} className={textSecondary} />
                <div>
                  <p className={`text-sm ${textSecondary}`}>Full Name</p>
                  <p className={`font-medium ${textColor}`}>
                    {`${userDetails?.firstName || ''} ${userDetails?.lastName || ''}`.trim() || 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-lg ${hoverBg} transition-colors duration-300`}>
              <div className="flex items-center gap-3">
                <Mail size={18} className={textSecondary} />
                <div>
                  <p className={`text-sm ${textSecondary}`}>Email</p>
                  <p className={`font-medium ${textColor}`}>{userDetails?.email || 'Not set'}</p>
                </div>
              </div>
              {userDetails?.emailVerified && (
                <CheckCircle size={16} className="text-green-500" />
              )}
            </div>

            <div className={`flex items-center justify-between p-3 rounded-lg ${hoverBg} transition-colors duration-300`}>
              <div className="flex items-center gap-3">
                <Users size={18} className={textSecondary} />
                <div>
                  <p className={`text-sm ${textSecondary}`}>Username</p>
                  <p className={`font-medium ${textColor}`}>{userDetails?.username || 'Not set'}</p>
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-lg ${hoverBg} transition-colors duration-300`}>
              <div className="flex items-center gap-3">
                <Calendar size={18} className={textSecondary} />
                <div>
                  <p className={`text-sm ${textSecondary}`}>Account Created</p>
                  <p className={`font-medium ${textColor}`}>{formatTimestamp(userDetails?.createdTimestamp)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - User Profile */}
        <div className={`${bgColor} backdrop-blur-sm rounded-3xl p-6 border ${borderColor} shadow-xl`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${userProfile ? 'from-green-500 to-green-600' : 'from-gray-400 to-gray-500'} rounded-lg flex items-center justify-center`}>
                <User size={20} className="text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${textColor}`}>User Profile</h2>
                <p className={`text-sm ${textSecondary}`}>Personal details & Addresses</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab(userProfile ? 'profile' : 'create')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              {userProfile ? 'View details' : 'Create profile'}
              <ChevronRight size={16} />
            </button>
          </div>

          {userProfile ? (
            <>
              {/* Profile Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {profileStats.map((stat, index) => (
                  <div key={index} className={`${cardBg} rounded-xl p-3 border ${cardBorder}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon size={14} style={{ color: theme === 'dark' ? stat.darkColor : stat.color }} />
                      <p className={`text-xs ${textSecondary}`}>{stat.label}</p>
                    </div>
                    <p className={`font-bold ${textColor}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Addresses Preview */}
              {userProfile.addresses && userProfile.addresses.length > 0 && (
                <div>
                  <h3 className={`font-semibold ${textColor} mb-3`}>Addresses</h3>
                  <div className="space-y-3">
                    {userProfile.addresses.slice(0, 2).map((address, index) => (
                      <div key={index} className={`${cardBg} rounded-xl p-4 border ${cardBorder}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {address.type === 'HOME' ? (
                              <Home size={16} className="text-blue-600" />
                            ) : (
                              <Building size={16} className="text-purple-600" />
                            )}
                            <span className={`font-medium ${textColor} capitalize`}>
                              {address.type?.toLowerCase()}
                            </span>
                            {address.isPrimary && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                theme === 'dark' 
                                  ? 'bg-blue-900/50 text-blue-300' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                Primary
                              </span>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm ${textColor}`}>{address.addressLine1}</p>
                        {address.addressLine2 && (
                          <p className={`text-sm ${lightText}`}>{address.addressLine2}</p>
                        )}
                        <p className={`text-sm ${textSecondary}`}>
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                    ))}
                    {userProfile.addresses.length > 2 && (
                      <p className={`text-sm ${textSecondary} text-center`}>
                        + {userProfile.addresses.length - 2} more addresses
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Profile Details */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {userProfile.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Smartphone size={16} className={textSecondary} />
                    <div>
                      <p className={`text-xs ${textSecondary}`}>Phone</p>
                      <p className={`font-medium ${textColor}`}>{userProfile.phoneNumber}</p>
                    </div>
                  </div>
                )}
                {userProfile.gender && (
                  <div className="flex items-center gap-2">
                    <User size={16} className={textSecondary} />
                    <div>
                      <p className={`text-xs ${textSecondary}`}>Gender</p>
                      <p className={`font-medium ${textColor} capitalize`}>{userProfile.gender.toLowerCase()}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                theme === 'dark' 
                  ? 'bg-yellow-900/30' 
                  : 'bg-gradient-to-br from-yellow-100 to-orange-100'
              }`}>
                <AlertCircle size={24} className="text-yellow-600" />
              </div>
              <h3 className={`font-bold ${textColor} mb-2`}>Profile Not Created</h3>
              <p className={`${textSecondary} mb-4`}>
                Complete your profile to add personal details and addresses
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Create Profile Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Actions Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Package size={24} className="text-blue-200" />
            <h4 className="font-bold">Quick Actions</h4>
          </div>
          <p className="text-blue-200 text-sm mb-4">
            Manage your profile and settings
          </p>
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab(userProfile ? 'profile' : 'create')}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 rounded-lg transition-colors"
            >
              {userProfile ? 'Edit Profile' : 'Create Profile'}
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Account Settings
            </button>
          </div>
        </div>
        
        {/* Profile Health Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag size={24} className="text-purple-200" />
            <h4 className="font-bold">Profile Health</h4>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-purple-200 text-sm">Completion</span>
              <span className="font-bold">
                {userProfile ? '85%' : '40%'}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: userProfile ? '85%' : '40%' }}
              ></div>
            </div>
            <div className="pt-2 space-y-1">
              <div className="flex items-center justify-between text-xs text-purple-200">
                <span>Basic Info</span>
                <CheckCircle size={12} />
              </div>
              <div className="flex items-center justify-between text-xs text-purple-200">
                <span>Profile</span>
                <span>{userProfile ? '✓' : '✗'}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-purple-200">
                <span>Addresses</span>
                <span>{userProfile?.addresses?.length > 0 ? '✓' : '✗'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security Status Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={24} className="text-green-200" />
            <h4 className="font-bold">Security Status</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-green-200" />
                <span className="text-green-200 text-sm">Email Verified</span>
              </div>
              {userDetails?.emailVerified ? (
                <CheckCircle size={16} className="text-green-200" />
              ) : (
                <AlertCircle size={16} className="text-yellow-200" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-green-200" />
                <span className="text-green-200 text-sm">2FA</span>
              </div>
              <span className="text-sm text-green-200/80">Not enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-green-200" />
                <span className="text-green-200 text-sm">Login Alerts</span>
              </div>
              <span className="text-sm text-green-200/80">Active</span>
            </div>
            <button 
              onClick={() => setActiveTab('security')}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 rounded-lg transition-colors text-sm mt-2"
            >
              Manage Security
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;