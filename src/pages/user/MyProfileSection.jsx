
// MyProfileSection.jsx
import React from 'react';
import { 
  User, Mail, Phone, Cake, 
  Home, Building, CheckCircle, Edit, Plus,
  Package, ShoppingBag, Heart, 
  MapPin, Award, Star
} from 'lucide-react';


const AddressCard = ({ address, isPrimary, theme }) => {
  const cardBg = theme === 'dark' ? 'from-gray-800 to-gray-900' : 'from-white to-gray-50';
  const cardBorder = theme === 'dark' 
    ? isPrimary ? 'border-blue-500/30' : 'border-gray-700' 
    : isPrimary ? 'border-blue-300' : 'border-gray-200';
  const iconBg = theme === 'dark' 
    ? isPrimary ? 'bg-blue-900/50' : 'bg-gray-800' 
    : isPrimary ? 'bg-blue-100' : 'bg-gray-100';
  const iconColor = theme === 'dark'
    ? isPrimary ? 'text-blue-400' : 'text-gray-400'
    : isPrimary ? 'text-blue-600' : 'text-gray-600';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const textLight = theme === 'dark' ? 'text-gray-500' : 'text-gray-600';
  const badgeBg = theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800';

  return (
    <div className={`bg-gradient-to-br ${cardBg} rounded-2xl p-5 border ${cardBorder} hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
            {address.type === 'HOME' ? (
              <Home size={18} className={iconColor} />
            ) : (
              <Building size={18} className={iconColor} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${textColor} capitalize`}>
                {address.type?.toLowerCase()}
              </span>
              {isPrimary && (
                <span className={`text-xs px-2 py-1 rounded-full ${badgeBg}`}>
                  Primary
                </span>
              )}
            </div>
            <p className={`text-sm ${textSecondary}`}>
              {address.city}, {address.state}
            </p>
          </div>
        </div>
        <button className={`${textSecondary} hover:text-blue-600 transition-colors`}>
          <Edit size={16} />
        </button>
      </div>
      
      <div className="space-y-2">
        <p className={textColor}>{address.addressLine1}</p>
        {address.addressLine2 && (
          <p className={textLight}>{address.addressLine2}</p>
        )}
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={14} className={textSecondary} />
          <span className={textSecondary}>
            {address.city}, {address.state} {address.zipCode}
          </span>
        </div>
        <p className={`text-sm ${textSecondary}`}>{address.country}</p>
      </div>
    </div>
  );
};

const MyProfileSection = ({ userProfile, setActiveTab, theme }) => {
  // Theme-specific colors
  const bgColor = theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95';
  const borderColor = theme === 'dark' ? 'border-gray-700/50' : 'border-white/30';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50';
  const infoBg = theme === 'dark' ? 'bg-blue-900/20' : 'bg-gradient-to-r from-blue-50 to-purple-50';
  const infoBorder = theme === 'dark' ? 'border-blue-800/30' : 'border-blue-100';
  const iconBgBlue = theme === 'dark' ? 'bg-blue-900/50' : 'bg-blue-100';
  const iconBgPurple = theme === 'dark' ? 'bg-purple-900/50' : 'bg-purple-100';
  const iconBgPink = theme === 'dark' ? 'bg-pink-900/50' : 'bg-pink-100';
  const iconTextBlue = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
  const iconTextPurple = theme === 'dark' ? 'text-purple-400' : 'text-purple-600';
  const iconTextPink = theme === 'dark' ? 'text-pink-400' : 'text-pink-600';

  if (!userProfile) {
    return (
      <div className={`${bgColor} backdrop-blur-sm rounded-3xl p-8 border ${borderColor} shadow-xl text-center transition-colors duration-300`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
          theme === 'dark' 
            ? 'bg-yellow-900/30' 
            : 'bg-gradient-to-br from-yellow-100 to-orange-100'
        }`}>
          <User size={32} className="text-yellow-600" />
        </div>
        <h2 className={`text-2xl font-bold ${textColor} mb-3`}>Profile Not Found</h2>
        <p className={`${textSecondary} mb-6 max-w-md mx-auto`}>
          You haven't created a complete profile yet. Your profile includes personal details, addresses, and preferences.
        </p>
        <button
          onClick={() => setActiveTab('create')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2"
        >
          <Plus size={20} />
          Create Profile Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className={`${bgColor} backdrop-blur-sm rounded-3xl p-6 border ${borderColor} shadow-xl transition-colors duration-300`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {userProfile.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${textColor}`}>{userProfile.fullName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Mail size={16} className={textSecondary} />
                <p className={textSecondary}>{userProfile.email}</p>
                <CheckCircle size={14} className="text-green-500" />
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <Edit size={18} />
            Edit Profile
          </button>
        </div>

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`flex items-center gap-3 p-4 ${cardBg} rounded-xl border ${borderColor}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgBlue}`}>
              <Phone size={18} className={iconTextBlue} />
            </div>
            <div>
              <p className={`text-sm ${textSecondary}`}>Phone</p>
              <p className={`font-semibold ${textColor}`}>{userProfile.phoneNumber || 'Not set'}</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 p-4 ${cardBg} rounded-xl border ${borderColor}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgPurple}`}>
              <Cake size={18} className={iconTextPurple} />
            </div>
            <div>
              <p className={`text-sm ${textSecondary}`}>Date of Birth</p>
              <p className={`font-semibold ${textColor}`}>{userProfile.dateOfBirth || 'Not set'}</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 p-4 ${cardBg} rounded-xl border ${borderColor}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgPink}`}>
              {/* <VenusMars size={18} className={iconTextPink} /> */}
            </div>
            <div>
              <p className={`text-sm ${textSecondary}`}>Gender</p>
              <p className={`font-semibold ${textColor} capitalize`}>
                {userProfile.gender?.toLowerCase() || 'Not set'}
              </p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        {userProfile.preferences && (
          <div className={`p-4 ${infoBg} rounded-xl border ${infoBorder} transition-colors duration-300`}>
            <div className="flex items-center gap-3 mb-3">
              <Heart size={20} className={theme === 'dark' ? 'text-pink-400' : 'text-pink-500'} />
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-gray-900'}`}>
                Preferences
              </h3>
            </div>
            <p className={theme === 'dark' ? 'text-blue-400/80' : 'text-gray-700'}>
              {userProfile.preferences}
            </p>
          </div>
        )}
      </div>

      {/* Addresses Section */}
      {userProfile.addresses && userProfile.addresses.length > 0 && (
        <div className={`${bgColor} backdrop-blur-sm rounded-3xl p-6 border ${borderColor} shadow-xl transition-colors duration-300`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${textColor}`}>Addresses</h3>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={18} />
              Add Address
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.addresses.map((address, index) => (
              <AddressCard 
                key={address.id || index}
                address={address}
                isPrimary={address.isPrimary}
                theme={theme}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Orders */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Package size={24} className="text-blue-200" />
            <h4 className="font-bold">Total Orders</h4>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-blue-200 text-sm mt-2">Start shopping now</p>
        </div>
        
        {/* Wishlist */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag size={24} className="text-purple-200" />
            <h4 className="font-bold">Wishlist</h4>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-purple-200 text-sm mt-2">Save your favorite items</p>
        </div>
        
        {/* Profile Score */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Award size={24} className="text-green-200" />
            <h4 className="font-bold">Profile Score</h4>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-3xl font-bold">85%</p>
            <Star size={16} className="text-yellow-300" />
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden mb-2">
            <div className="bg-white h-full rounded-full w-4/5"></div>
          </div>
          <p className="text-green-200 text-sm">Almost complete!</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfileSection;