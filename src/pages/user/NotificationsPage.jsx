// NotificationsPage.jsx
import React, { useState } from 'react';
import { 
  Bell, Mail, Smartphone, Calendar, AlertCircle,
  CheckCircle, XCircle, Settings, Clock, MessageSquare,
  User, CreditCard, Package, Star, Trash2,
  ToggleLeft, ToggleRight
} from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState({
    email: {
      promotional: true,
      security: true,
      updates: false,
      newsletters: true
    },
    push: {
      messages: true,
      reminders: false,
      promotions: false,
      security: true
    },
    sms: {
      security: true,
      promotions: false,
      updates: false
    }
  });

  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      type: 'security',
      title: 'New login detected',
      message: 'A new device logged into your account from New York',
      time: '5 minutes ago',
      read: false,
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 2,
      type: 'update',
      title: 'Profile update successful',
      message: 'Your profile information has been updated',
      time: '1 hour ago',
      read: true,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'message',
      title: 'New message received',
      message: 'You have a new message from John Doe',
      time: '2 hours ago',
      read: false,
      icon: MessageSquare,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment processed',
      message: 'Your payment of $49.99 has been processed',
      time: '1 day ago',
      read: true,
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order shipped',
      message: 'Your order #12345 has been shipped',
      time: '2 days ago',
      read: true,
      icon: Package,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ]);

  const handleToggle = (category, type) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type]
      }
    }));
  };

  const markAsRead = (id) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAll = () => {
    setNotificationList([]);
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
            <Bell size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Manage your alerts and preferences</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
            {unreadCount} unread
          </span>
        )}
      </div>

      <div className="space-y-8">
        {/* Notification Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <CheckCircle size={18} />
              Mark all as read
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 size={18} />
              Clear all
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Total: {notificationList.length} notifications
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notificationList.length > 0 ? (
            notificationList.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start justify-between p-4 rounded-xl border ${
                  notification.read 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.color}`}>
                    <notification.icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Mark as read"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
          </div>

          <div className="space-y-6">
            {/* Email Notifications */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail size={18} className="text-gray-600" />
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(notifications.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{key}</p>
                      <p className="text-sm text-gray-500">Receive {key} notifications via email</p>
                    </div>
                    <button
                      onClick={() => handleToggle('email', key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Smartphone size={18} className="text-gray-600" />
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(notifications.push).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{key}</p>
                      <p className="text-sm text-gray-500">Receive {key} push notifications</p>
                    </div>
                    <button
                      onClick={() => handleToggle('push', key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;