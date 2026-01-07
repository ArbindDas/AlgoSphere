

// AdminDashboard.jsx - Complete E-commerce Admin Dashboard
import React, { useState, useEffect } from 'react';
import withAuth from "../../context/hoc/withAuth";
import {
  BarChart3, Users, Package, ShoppingCart, DollarSign,
  TrendingUp, AlertCircle, CheckCircle, XCircle, Settings,
  Eye, Edit, Trash2, Download, Filter, Search, Plus, MoreVertical,
  Sun, Moon
} from 'lucide-react';

// Import components
import AdminSidebar from './AdminSidebar';
import ProductManagement from './ProductManagement';
import StatsCard from './StatsCard';
import UserManagement from './UserManagement';
import AnalyticsChart from './AnalyticsChart';
import RecentOrdersTable from './ RecentOrdersTable';
import { useTheme } from '../../context/ThemeContext'; // Import theme context

const AdminDashboard = ({ user }) => {
  const { theme, toggleTheme } = useTheme(); // Get theme from context
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  });

  // Mock data - Replace with API calls
  useEffect(() => {
    const fetchStats = async () => {
      setStats({
        totalRevenue: 45231.89,
        totalOrders: 1245,
        totalProducts: 156,
        totalCustomers: 892,
        pendingOrders: 23,
        lowStockProducts: 12
      });
    };
    fetchStats();
  }, []);

  // Dashboard content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatsCard
                title="Total Revenue"
                value={`$${stats.totalRevenue.toLocaleString()}`}
                change="+12.5%"
                icon={DollarSign}
                color="green"
                theme={theme}
              />
              <StatsCard
                title="Total Orders"
                value={stats.totalOrders.toLocaleString()}
                change="+8.2%"
                icon={ShoppingCart}
                color="blue"
                theme={theme}
              />
              <StatsCard
                title="Total Products"
                value={stats.totalProducts.toString()}
                change="+3.1%"
                icon={Package}
                color="purple"
                theme={theme}
              />
              <StatsCard
                title="Total Customers"
                value={stats.totalCustomers.toString()}
                change="+15.3%"
                icon={Users}
                color="orange"
                theme={theme}
              />
              <StatsCard
                title="Pending Orders"
                value={stats.pendingOrders.toString()}
                change="-2.4%"
                icon={AlertCircle}
                color="yellow"
                theme={theme}
              />
              <StatsCard
                title="Low Stock Items"
                value={stats.lowStockProducts.toString()}
                change="+5.6%"
                icon={AlertCircle}
                color="red"
                theme={theme}
              />
            </div>

            {/* Charts and Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`rounded-xl shadow p-6 ${
                theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Revenue Analytics
                </h3>
                <AnalyticsChart theme={theme} />
              </div>
              <div className={`rounded-xl shadow p-6 ${
                theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Recent Orders
                </h3>
                <RecentOrdersTable theme={theme} />
              </div>
            </div>
          </div>
        );

      case 'products':
        return <ProductManagement theme={theme} />;

      case 'orders':
        return (
          <div className={`rounded-xl shadow ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex justify-between items-center">
                <h2 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Order Management
                </h2>
                <div className="flex gap-2">
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    <Filter size={16} />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>
            </div>
            {/* Orders table would go here */}
          </div>
        );

      case 'customers':
        return <UserManagement />; // UserManagement already has its own theme context

      case 'analytics':
        return (
          <div className={`rounded-xl shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Advanced Analytics
            </h2>
            <div className="space-y-6">
              {/* Multiple analytics charts would go here */}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className={`rounded-xl shadow p-6 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              System Settings
            </h2>
            {/* Settings form would go here */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="flex">
        {/* Sidebar - Pass theme prop */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          theme={theme}
        />

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Header with Theme Toggle */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className={`text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {activeTab === 'overview' ? 'Dashboard Overview' : 
                   activeTab === 'products' ? 'Product Management' :
                   activeTab === 'orders' ? 'Order Management' :
                   activeTab === 'customers' ? 'Customer Management' :
                   activeTab === 'analytics' ? 'Analytics' : 'Settings'}
                </h1>
                <p className={`mt-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Welcome back, {user.name || user.email}! Manage your e-commerce store efficiently.
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard, ['ADMIN'], true);