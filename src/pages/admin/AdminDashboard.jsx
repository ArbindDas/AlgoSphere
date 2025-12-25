// AdminDashboard.jsx - Complete E-commerce Admin Dashboard
import React, { useState, useEffect } from 'react';
import withAuth from "../../context/hoc/withAuth";
import {
  BarChart3, Users, Package, ShoppingCart, DollarSign,
  TrendingUp, AlertCircle, CheckCircle, XCircle, Settings,
  Eye, Edit, Trash2, Download, Filter, Search, Plus, MoreVertical
} from 'lucide-react';

// Import components
import AdminSidebar from './AdminSidebar';
import ProductManagement from './ProductManagement';
import StatsCard from './StatsCard';
import UserManagement from './UserManagement';
import AnalyticsChart from './AnalyticsChart';
import RecentOrdersTable from './ RecentOrdersTable'

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0, // Added missing property
    pendingOrders: 0,
    lowStockProducts: 0
  });

  // Mock data - Replace with API calls
  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      // API call would go here
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
              />
              <StatsCard
                title="Total Orders"
                value={stats.totalOrders.toLocaleString()}
                change="+8.2%"
                icon={ShoppingCart}
                color="blue"
              />
              <StatsCard
                title="Total Products"
                value={stats.totalProducts.toString()}
                change="+3.1%"
                icon={Package}
                color="purple"
              />
              <StatsCard
                title="Total Customers"
                value={stats.totalCustomers.toString()}
                change="+15.3%"
                icon={Users}
                color="orange"
              />
              <StatsCard
                title="Pending Orders"
                value={stats.pendingOrders.toString()}
                change="-2.4%"
                icon={AlertCircle}
                color="yellow"
              />
              <StatsCard
                title="Low Stock Items"
                value={stats.lowStockProducts.toString()}
                change="+5.6%"
                icon={AlertCircle}
                color="red"
              />
            </div>

            {/* Charts and Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
                <AnalyticsChart />
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                <RecentOrdersTable />
              </div>
            </div>
          </div>
        );

      case 'products':
        return <ProductManagement />;

      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Order Management</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <Filter size={16} />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
        return <UserManagement />;

      case 'analytics':
        return (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-6">Advanced Analytics</h2>
            <div className="space-y-6">
              {/* Multiple analytics charts would go here */}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-6">System Settings</h2>
            {/* Settings form would go here */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
        />

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === 'overview' ? 'Dashboard Overview' : 
               activeTab === 'products' ? 'Product Management' :
               activeTab === 'orders' ? 'Order Management' :
               activeTab === 'customers' ? 'Customer Management' :
               activeTab === 'analytics' ? 'Analytics' : 'Settings'}
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user.name || user.email}! Manage your e-commerce store efficiently.
            </p>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminDashboard, ['ADMIN'], true);