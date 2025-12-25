// components/ProductManagement.jsx
import React, { useState } from 'react';
import {
  Search, Filter, Plus, Edit, Trash2, Eye,
  MoreVertical, Download, Upload
} from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Headphones',
      sku: 'PH-001',
      price: 299.99,
      stock: 45,
      category: 'Electronics',
      status: 'active'
    },
    // Add more products...
  ]);

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Product Management</h2>
            <p className="text-gray-600">Manage all your products in one place</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Upload size={16} />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mt-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">SKU</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{product.name}</td>
                <td className="p-4 text-gray-500">{product.sku}</td>
                <td className="p-4 font-medium">${product.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 20 
                      ? 'bg-green-100 text-green-800'
                      : product.stock > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;