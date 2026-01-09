
// ActivityLogPage.jsx
import React, { useState } from 'react';
import { 
  Activity, Calendar, Filter, Download, Search,
  User, Key, Mail, MapPin, Settings, CreditCard,
  Package, Shield, Clock, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, Sun, Moon
} from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

const ActivityLogPage = ({ theme }) => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'login',
      title: 'Successful Login',
      description: 'Logged in from Chrome on Windows',
      timestamp: '2024-01-15T10:30:00Z',
      ip: '192.168.1.1',
      location: 'New York, USA',
      icon: Key,
      color: 'bg-green-100 text-green-600',
      darkColor: 'bg-green-900/30 text-green-400',
      important: false
    },
    {
      id: 2,
      type: 'profile_update',
      title: 'Profile Updated',
      description: 'Updated phone number and address',
      timestamp: '2024-01-15T09:15:00Z',
      ip: '192.168.1.1',
      location: 'New York, USA',
      icon: User,
      color: 'bg-blue-100 text-blue-600',
      darkColor: 'bg-blue-900/30 text-blue-400',
      important: true
    },
    {
      id: 3,
      type: 'email_change',
      title: 'Email Verification',
      description: 'Email verification link sent',
      timestamp: '2024-01-14T16:45:00Z',
      ip: '192.168.1.2',
      location: 'London, UK',
      icon: Mail,
      color: 'bg-purple-100 text-purple-600',
      darkColor: 'bg-purple-900/30 text-purple-400',
      important: false
    },
    {
      id: 4,
      type: 'address_add',
      title: 'Address Added',
      description: 'Added new shipping address',
      timestamp: '2024-01-14T14:20:00Z',
      ip: '192.168.1.1',
      location: 'New York, USA',
      icon: MapPin,
      color: 'bg-yellow-100 text-yellow-600',
      darkColor: 'bg-yellow-900/30 text-yellow-400',
      important: false
    },
    {
      id: 5,
      type: 'security',
      title: 'Password Changed',
      description: 'Account password was updated',
      timestamp: '2024-01-13T11:10:00Z',
      ip: '192.168.1.1',
      location: 'New York, USA',
      icon: Shield,
      color: 'bg-red-100 text-red-600',
      darkColor: 'bg-red-900/30 text-red-400',
      important: true
    },
    {
      id: 6,
      type: 'settings',
      title: 'Settings Updated',
      description: 'Changed notification preferences',
      timestamp: '2024-01-12T19:30:00Z',
      ip: '192.168.1.3',
      location: 'Tokyo, Japan',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600',
      darkColor: 'bg-gray-800 text-gray-400',
      important: false
    }
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: '7days',
    important: false,
    search: ''
  });

  const [expandedActivity, setExpandedActivity] = useState(null);

  const activityTypes = [
    { id: 'all', label: 'All Activities' },
    { id: 'login', label: 'Logins' },
    { id: 'profile_update', label: 'Profile Updates' },
    { id: 'security', label: 'Security' },
    { id: 'settings', label: 'Settings' }
  ];

  const dateRanges = [
    { id: '24hours', label: 'Last 24 hours' },
    { id: '7days', label: 'Last 7 days' },
    { id: '30days', label: 'Last 30 days' },
    { id: 'all', label: 'All time' }
  ];

  const filterActivities = () => {
    return activities.filter(activity => {
      // Filter by type
      if (filters.type !== 'all' && activity.type !== filters.type) {
        return false;
      }

      // Filter by importance
      if (filters.important && !activity.important) {
        return false;
      }

      // Filter by search
      if (filters.search && !activity.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !activity.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Filter by date range
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      let daysAgo = 0;

      switch (filters.dateRange) {
        case '24hours':
          daysAgo = 1;
          break;
        case '7days':
          daysAgo = 7;
          break;
        case '30days':
          daysAgo = 30;
          break;
        case 'all':
        default:
          return true;
      }

      const timeDiff = now - activityDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      
      return daysDiff <= daysAgo;
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    return `${Math.floor(seconds / 2592000)} months ago`;
  };

  const toggleExpand = (id) => {
    setExpandedActivity(expandedActivity === id ? null : id);
  };

  const exportLog = () => {
    alert('Activity log exported successfully!');
  };

  const filteredActivities = filterActivities();

  // Theme-specific colors
  const bgColor = theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95';
  const borderColor = theme === 'dark' ? 'border-gray-700/50' : 'border-white/30';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50';
  const cardBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const inputBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const placeholderColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';

  return (
    <div className={`${bgColor} backdrop-blur-sm rounded-3xl p-6 border ${borderColor} shadow-xl transition-colors duration-300`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <Activity size={24} className="text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${textColor}`}>Activity Log</h1>
          <p className={textSecondary}>Track your account activities</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Activity size={20} className="text-green-200" />
              <div>
                <p className="text-sm text-green-200">Total Activities</p>
                <p className="text-2xl font-bold">{activities.length}</p>
              </div>
            </div>
            <p className="text-sm text-green-200">Last 30 days</p>
          </div>

          <div className={`${cardBg} rounded-2xl p-5 border ${cardBorder}`}>
            <div className="flex items-center gap-3 mb-3">
              <Key size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
              <div>
                <p className={`text-sm ${textSecondary}`}>Logins</p>
                <p className={`text-2xl font-bold ${textColor}`}>
                  {activities.filter(a => a.type === 'login').length}
                </p>
              </div>
            </div>
            <p className={`text-sm ${textSecondary}`}>Successful attempts</p>
          </div>

          <div className={`${cardBg} rounded-2xl p-5 border ${cardBorder}`}>
            <div className="flex items-center gap-3 mb-3">
              <Shield size={20} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
              <div>
                <p className={`text-sm ${textSecondary}`}>Security</p>
                <p className={`text-2xl font-bold ${textColor}`}>
                  {activities.filter(a => a.type === 'security').length}
                </p>
              </div>
            </div>
            <p className={`text-sm ${textSecondary}`}>Security changes</p>
          </div>

          <div className={`${cardBg} rounded-2xl p-5 border ${cardBorder}`}>
            <div className="flex items-center gap-3 mb-3">
              <User size={20} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
              <div>
                <p className={`text-sm ${textSecondary}`}>Updates</p>
                <p className={`text-2xl font-bold ${textColor}`}>
                  {activities.filter(a => a.type === 'profile_update').length}
                </p>
              </div>
            </div>
            <p className={`text-sm ${textSecondary}`}>Profile changes</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`${cardBg} rounded-2xl p-6 border ${cardBorder}`}>
          <div className="flex items-center gap-3 mb-6">
            <Filter size={20} className={textSecondary} />
            <h2 className={`text-lg font-semibold ${textColor}`}>Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Activity Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className={`w-full p-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${textColor}`}
              >
                {activityTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className={`w-full p-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${textColor}`}
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  placeholder="Search activities..."
                  className={`w-full p-3 pl-10 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${textColor} placeholder:${placeholderColor}`}
                />
                <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-end">
              <label className={`flex items-center gap-2 p-3 ${inputBg} border ${inputBorder} rounded-xl cursor-pointer ${textColor}`}>
                <input
                  type="checkbox"
                  checked={filters.important}
                  onChange={(e) => setFilters({...filters, important: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="font-medium">Important Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${textColor}`}>
              Recent Activities ({filteredActivities.length})
            </h3>
            <button
              onClick={exportLog}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Download size={18} />
              Export Log
            </button>
          </div>

          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div key={activity.id} className={`${cardBg} rounded-xl border ${cardBorder} overflow-hidden transition-colors duration-300`}>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        theme === 'dark' ? activity.darkColor : activity.color
                      }`}>
                        <activity.icon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-semibold ${textColor}`}>{activity.title}</h4>
                          {activity.important && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              theme === 'dark' 
                                ? 'bg-red-900/50 text-red-300' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              Important
                            </span>
                          )}
                        </div>
                        <p className={textSecondary}>{activity.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <Clock size={14} className={textSecondary} />
                          <span className={textSecondary}>{getTimeAgo(activity.timestamp)}</span>
                          <span className={textSecondary}>•</span>
                          <span className={textSecondary}>{formatDate(activity.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleExpand(activity.id)}
                      className={textSecondary}
                    >
                      {expandedActivity === activity.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedActivity === activity.id && (
                  <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} border-t ${cardBorder} p-4 transition-colors duration-300`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm font-medium ${textSecondary} mb-1`}>Location</p>
                        <p className={textColor}>{activity.location}</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${textSecondary} mb-1`}>IP Address</p>
                        <p className={`font-mono ${textColor}`}>{activity.ip}</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${textSecondary} mb-1`}>Activity ID</p>
                        <p className={`font-mono text-sm ${textColor}`}>{activity.id}</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${textSecondary} mb-1`}>Status</p>
                        <span className={`inline-flex items-center gap-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          <CheckCircle size={14} />
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={`text-center py-12 ${cardBg} rounded-xl border ${cardBorder}`}>
              <Activity size={48} className={`${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'} mx-auto mb-4`} />
              <h3 className={`text-lg font-semibold ${textColor} mb-2`}>No activities found</h3>
              <p className={textSecondary}>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogPage;