// components/AnalyticsChart.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';

const AnalyticsChart = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Sample data
  const revenueData = [
    { day: 'Mon', revenue: 4200, orders: 24 },
    { day: 'Tue', revenue: 5200, orders: 32 },
    { day: 'Wed', revenue: 4800, orders: 28 },
    { day: 'Thu', revenue: 5800, orders: 35 },
    { day: 'Fri', revenue: 6100, orders: 42 },
    { day: 'Sat', revenue: 7200, orders: 48 },
    { day: 'Sun', revenue: 6800, orders: 45 },
  ];

  const categoryData = [
    { category: 'Electronics', value: 42, color: '#3B82F6' },
    { category: 'Fashion', value: 28, color: '#8B5CF6' },
    { category: 'Home', value: 18, color: '#10B981' },
    { category: 'Books', value: 12, color: '#F59E0B' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 12500, profit: 4500 },
    { month: 'Feb', revenue: 14200, profit: 5200 },
    { month: 'Mar', revenue: 16800, profit: 6200 },
    { month: 'Apr', revenue: 15200, profit: 5800 },
    { month: 'May', revenue: 18900, profit: 7200 },
    { month: 'Jun', revenue: 21000, profit: 8500 },
  ];

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-lg font-semibold">Revenue Overview</h4>
          <p className="text-sm text-gray-600">Last 7 days performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
            <Calendar size={16} />
            <select 
              className="bg-transparent outline-none text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter size={16} />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>

      {/* Main Revenue Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
              labelStyle={{ color: '#374151', fontWeight: 'bold' }}
              contentStyle={{ 
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3B82F6" 
              fill="url(#colorRevenue)" 
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats and Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Volume Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold mb-4">Order Volume</h5>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar 
                  dataKey="orders" 
                  fill="#8B5CF6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold mb-4">Sales by Category</h5>
          <div className="space-y-3">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${item.value}%`,
                        backgroundColor: item.color 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Monthly Trend */}
          <div className="mt-6 pt-6 border-t">
            <h5 className="font-semibold mb-4">Monthly Trend</h5>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={20} />
            <span className="text-sm text-blue-700">Avg. Order Value</span>
          </div>
          <p className="text-2xl font-bold mt-2">$89.42</p>
          <p className="text-xs text-blue-600 mt-1">+8.5% from last week</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-600" size={20} />
            <span className="text-sm text-green-700">Conversion Rate</span>
          </div>
          <p className="text-2xl font-bold mt-2">3.8%</p>
          <p className="text-xs text-green-600 mt-1">+1.2% from last week</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-purple-600" size={20} />
            <span className="text-sm text-purple-700">Customer Growth</span>
          </div>
          <p className="text-2xl font-bold mt-2">+124</p>
          <p className="text-xs text-purple-600 mt-1">New customers this week</p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingDown className="text-amber-600" size={20} />
            <span className="text-sm text-amber-700">Refund Rate</span>
          </div>
          <p className="text-2xl font-bold mt-2">2.1%</p>
          <p className="text-xs text-amber-600 mt-1">-0.3% from last week</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;