// SecurityPage.jsx
import React, { useState } from 'react';
import { 
  Shield, Lock, Key, Eye, EyeOff, AlertCircle,
  CheckCircle, XCircle, RefreshCw, History, Users,
  Smartphone, Mail, Globe, Download
} from 'lucide-react';

const SecurityPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const securityItems = [
    {
      id: 'password',
      title: 'Password Strength',
      status: 'Strong',
      icon: Lock,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Last changed 30 days ago'
    },
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      status: 'Disabled',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'Add an extra layer of security'
    },
    {
      id: 'sessions',
      title: 'Active Sessions',
      status: '2 devices',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Currently logged in'
    },
    {
      id: 'backup',
      title: 'Backup Codes',
      status: 'Generated',
      icon: Key,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: '10 codes remaining'
    }
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, USA',
      ip: '192.168.1.1',
      lastActive: '2 hours ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'London, UK',
      ip: '192.168.1.2',
      lastActive: '1 day ago',
      current: false
    },
    {
      id: 3,
      device: 'Firefox on Mac',
      location: 'Tokyo, Japan',
      ip: '192.168.1.3',
      lastActive: '5 days ago',
      current: false
    }
  ];

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleRevokeSession = (sessionId) => {
    alert(`Session ${sessionId} revoked!`);
  };

  const handleEnable2FA = () => {
    alert('2FA enabled! Scan the QR code with your authenticator app.');
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
          <Shield size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security</h1>
          <p className="text-gray-600">Manage your account security settings</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {securityItems.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className={`font-bold ${item.color}`}>{item.status}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{item.description}</p>
              {item.id === '2fa' && item.status === 'Disabled' && (
                <button
                  onClick={handleEnable2FA}
                  className="mt-3 w-full text-sm bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Enable 2FA
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Change Password */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
          </div>
          
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>

        {/* Active Sessions */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Smartphone size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{session.device}</p>
                        {session.current && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span>{session.location}</span>
                        <span>•</span>
                        <span>IP: {session.ip}</span>
                        <span>•</span>
                        <span>Last active: {session.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!session.current && (
                    <button
                      onClick={() => handleRevokeSession(session.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={20} className="text-red-600" />
            <h3 className="font-semibold text-gray-900">Security Tips</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-500 mt-0.5" />
              Use a strong, unique password that you don't use elsewhere
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-500 mt-0.5" />
              Enable two-factor authentication for added security
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-500 mt-0.5" />
              Regularly review active sessions and revoke unknown devices
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-500 mt-0.5" />
              Keep your recovery codes in a safe place
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;