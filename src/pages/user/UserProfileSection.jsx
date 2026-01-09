
// UserProfileSection.jsx
import React from 'react';
import { 
  User, Mail, Shield, Calendar, Clock, Key,
  CheckCircle, XCircle, Eye, Lock, Globe, Smartphone
} from 'lucide-react';


const StatCard = ({ icon: Icon, label, value, color, darkColor, delay, theme }) => (
  <div 
    className={`rounded-2xl p-6 border backdrop-blur-sm hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${
      theme === 'dark' 
        ? 'bg-gray-800/90 border-gray-700/50 text-white' 
        : 'bg-white/90 border-white/30 text-gray-900'
    }`}
    style={{
      animation: `fadeInUp 0.6s ease-out ${delay}s both`,
      boxShadow: theme === 'dark' 
        ? '0 8px 25px rgba(0, 0, 0, 0.25)' 
        : '0 8px 25px rgba(0, 0, 0, 0.08)'
    }}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-700/50' : ''
    }`}
         style={{ 
           backgroundColor: `${theme === 'dark' ? darkColor : color}${theme === 'dark' ? '20' : '15'}` 
         }}>
      <Icon size={24} style={{ color: theme === 'dark' ? darkColor : color }} />
    </div>
    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const InfoRow = ({ icon: Icon, label, value, verified, theme }) => (
  <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
    theme === 'dark' 
      ? 'hover:bg-gray-800/50' 
      : 'hover:bg-white/50'
  }`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'
    }`}>
      <Icon size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
    </div>
    <div className="flex-1">
      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{label}</p>
      <div className="flex items-center gap-2">
        <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        {verified !== undefined && (
          verified ? (
            <CheckCircle size={16} className="text-green-500" />
          ) : (
            <XCircle size={16} className="text-yellow-500" />
          )
        )}
      </div>
    </div>
  </div>
);

const UserProfileSection = ({ userDetails, formatTimestamp, calculateAccountAge, theme }) => {
  // Theme-specific colors
  const bgColor = theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95';
  const borderColor = theme === 'dark' ? 'border-gray-700/50' : 'border-white/30';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const badgeBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const badgeText = theme === 'dark' ? 'text-gray-300' : 'text-gray-500';

  // Additional user details if available
  const additionalInfo = [
    userDetails?.attributes?.phone && {
      icon: Smartphone,
      label: 'Phone',
      value: userDetails.attributes.phone,
      verified: true
    },
    userDetails?.attributes?.locale && {
      icon: Globe,
      label: 'Locale',
      value: userDetails.attributes.locale,
      verified: false
    }
  ].filter(Boolean);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={Shield} 
          label="Account Status" 
          value={userDetails?.enabled ? "Active" : "Inactive"}
          color="#10b981"
          darkColor="#34d399"
          delay={0.1}
          theme={theme}
        />
        <StatCard 
          icon={Mail} 
          label="Email Verified" 
          value={userDetails?.emailVerified ? "Verified" : "Pending"}
          color={userDetails?.emailVerified ? "#10b981" : "#f59e0b"}
          darkColor={userDetails?.emailVerified ? "#34d399" : "#fbbf24"}
          delay={0.2}
          theme={theme}
        />
        <StatCard 
          icon={Calendar} 
          label="Member Since" 
          value={userDetails?.createdTimestamp 
            ? new Date(userDetails.createdTimestamp).getFullYear()
            : "N/A"
          }
          color="#8b5cf6"
          darkColor="#a78bfa"
          delay={0.3}
          theme={theme}
        />
        <StatCard 
          icon={Clock} 
          label="Account Age" 
          value={calculateAccountAge()}
          color="#6366f1"
          darkColor="#818cf8"
          delay={0.4}
          theme={theme}
        />
      </div>

      {/* Profile Information */}
      <div className={`${bgColor} backdrop-blur-sm rounded-3xl p-6 border ${borderColor} shadow-xl`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-bold ${textColor}`}>Keycloak Profile Details</h2>
            <p className={`text-sm ${textSecondary}`}>Authentication & Security Information</p>
          </div>
          <div className={`text-xs ${badgeText} ${badgeBg} px-3 py-1 rounded-full flex items-center gap-2`}>
            <Lock size={12} />
            <span>ID: {userDetails?.id ? `${userDetails.id.substring(0, 8)}...` : 'N/A'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <InfoRow 
            icon={User} 
            label="Full Name" 
            value={`${userDetails?.firstName || ''} ${userDetails?.lastName || ''}`.trim() || 'Not set'}
            theme={theme}
          />
          <InfoRow 
            icon={Mail} 
            label="Email Address" 
            value={userDetails?.email || 'Not set'}
            verified={userDetails?.emailVerified}
            theme={theme}
          />
          <InfoRow 
            icon={User} 
            label="Username" 
            value={userDetails?.username || 'Not set'}
            theme={theme}
          />
          <InfoRow 
            icon={Shield} 
            label="Account Status" 
            value={userDetails?.enabled ? 'Active' : 'Inactive'}
            verified={userDetails?.enabled}
            theme={theme}
          />
          <InfoRow 
            icon={Calendar} 
            label="Account Created" 
            value={formatTimestamp(userDetails?.createdTimestamp)}
            theme={theme}
          />
          <InfoRow 
            icon={Key} 
            label="User ID" 
            value={userDetails?.id || 'Not available'}
            theme={theme}
          />
          
          {/* Additional Attributes */}
          {additionalInfo.length > 0 && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                <h3 className={`font-semibold mb-3 ${textColor}`}>Additional Attributes</h3>
                {additionalInfo.map((info, index) => (
                  <InfoRow 
                    key={index}
                    icon={info.icon}
                    label={info.label}
                    value={info.value}
                    verified={info.verified}
                    theme={theme}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Security Note */}
        <div className={`mt-6 p-4 rounded-xl border ${
          theme === 'dark' 
            ? 'bg-blue-900/20 border-blue-800/30' 
            : 'bg-blue-50 border-blue-100'
        }`}>
          <div className="flex items-start gap-3">
            <Eye size={18} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
            <div>
              <p className={`font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                Security Information
              </p>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-blue-400/80' : 'text-blue-600'}`}>
                Your Keycloak profile contains authentication details. For complete profile with addresses, 
                visit the "My Profile" section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileSection;