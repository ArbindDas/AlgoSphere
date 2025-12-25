// components/RecentOrdersTable.jsx
import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, Truck, Package, 
  Eye, MoreVertical, Filter, Download, Search 
} from 'lucide-react';

const RecentOrdersTable = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-7842',
      customer: 'Alex Johnson',
      date: '2024-01-15',
      amount: 189.99,
      status: 'delivered',
      items: 3,
      payment: 'Credit Card'
    },
    {
      id: 'ORD-7841',
      customer: 'Sarah Williams',
      date: '2024-01-15',
      amount: 245.50,
      status: 'processing',
      items: 5,
      payment: 'PayPal'
    },
    {
      id: 'ORD-7840',
      customer: 'Michael Chen',
      date: '2024-01-14',
      amount: 89.99,
      status: 'shipped',
      items: 1,
      payment: 'Credit Card'
    },
    {
      id: 'ORD-7839',
      customer: 'Emma Davis',
      date: '2024-01-14',
      amount: 425.75,
      status: 'pending',
      items: 7,
      payment: 'Stripe'
    },
    {
      id: 'ORD-7838',
      customer: 'Robert Garcia',
      date: '2024-01-13',
      amount: 156.30,
      status: 'delivered',
      items: 2,
      payment: 'Apple Pay'
    },
    {
      id: 'ORD-7837',
      customer: 'Lisa Thompson',
      date: '2024-01-13',
      amount: 299.99,
      status: 'cancelled',
      items: 4,
      payment: 'Credit Card'
    },
    {
      id: 'ORD-7836',
      customer: 'David Wilson',
      date: '2024-01-12',
      amount: 75.25,
      status: 'shipped',
      items: 1,
      payment: 'PayPal'
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter orders based on status and search
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle size={14} />,
        text: 'Delivered'
      },
      shipped: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Truck size={14} />,
        text: 'Shipped'
      },
      processing: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Package size={14} />,
        text: 'Processing'
      },
      pending: {
        color: 'bg-orange-100 text-orange-800',
        icon: <Clock size={14} />,
        text: 'Pending'
      },
      cancelled: {
        color: 'bg-red-100 text-red-800',
        icon: <XCircle size={14} />,
        text: 'Cancelled'
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        <span>{config.text}</span>
      </div>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span className="text-sm">More Filters</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={16} />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.payment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(order.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    ${order.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.items} items</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1.5 hover:bg-gray-100 rounded"
                      title="View Order"
                    >
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button 
                      className="p-1.5 hover:bg-gray-100 rounded"
                      title="More Options"
                    >
                      <MoreVertical size={16} className="text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold mt-1">24</div>
          <div className="text-xs text-green-600 mt-1">+12% this week</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-500">Avg. Processing Time</div>
          <div className="text-2xl font-bold mt-1">2.4h</div>
          <div className="text-xs text-green-600 mt-1">-0.5h from last week</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold mt-1">$1,482.77</div>
          <div className="text-xs text-green-600 mt-1">+18% this week</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-500">Cancellation Rate</div>
          <div className="text-2xl font-bold mt-1">2.8%</div>
          <div className="text-xs text-red-600 mt-1">+0.5% from last week</div>
        </div>
      </div>

      {/* No Results */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentOrdersTable;