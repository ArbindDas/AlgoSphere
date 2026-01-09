// SettingsPage.jsx
import React, { useState } from 'react';
import { 
  Settings, Bell, Globe, Palette, User, Mail,
  Save, Moon, Sun, Monitor, Eye, EyeOff,
  CheckCircle, XCircle, Clock, Shield
} from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
    privacyMode: false,
    autoSave: true,
    timezone: 'UTC+0'
  });

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'hi', name: 'हिन्दी' }
  ];

  const timezones = [
    'UTC+0', 'UTC+1', 'UTC+2', 'UTC+3', 'UTC+5:30', 'UTC+8', 'UTC-5', 'UTC-8'
  ];

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
          <Settings size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Theme Settings */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Theme & Appearance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleChange('theme', theme.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  settings.theme === theme.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <theme.icon size={20} className={settings.theme === theme.id ? 'text-blue-600' : 'text-gray-500'} />
                  <span className={`font-medium ${settings.theme === theme.id ? 'text-blue-600' : 'text-gray-700'}`}>
                    {theme.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Receive browser notifications</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Privacy & Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button
                onClick={() => handleToggle('twoFactorAuth')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <div>
                <p className="font-medium text-gray-900">Privacy Mode</p>
                <p className="text-sm text-gray-500">Hide sensitive information</p>
              </div>
              <button
                onClick={() => handleToggle('privacyMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.privacyMode ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.privacyMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Language & Region</h3>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Timezone</h3>
            </div>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Save size={20} />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;