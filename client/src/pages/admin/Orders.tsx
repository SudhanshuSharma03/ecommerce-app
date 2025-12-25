import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import {
  Search,
  Filter,
  Eye,
  Download,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.getOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

// Placeholder for removed mock data
const mockOrders = [
  {
    _id: 'ORD001',
    customer: {
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '9876543210',
    },
    products: [
      { name: 'iPhone 12 Pro', quantity: 1, price: 54999 },
    ],
    total: 64918.82,
    status: 'Delivered',
    paymentMethod: 'UPI',
    shippingAddress: '123 MG Road, Mumbai, Maharashtra - 400001',
    orderDate: '2025-11-23',
    deliveryDate: '2025-11-24',
  },
  {
    _id: 'ORD002',
    customer: {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '9876543211',
    },
    products: [
      { name: 'MacBook Air M1', quantity: 1, price: 64999 },
    ],
    total: 76698.82,
    status: 'Processing',
    paymentMethod: 'Card',
    shippingAddress: '456 Park Street, Kolkata, West Bengal - 700016',
    orderDate: '2025-11-23',
    deliveryDate: null,
  },
  {
    _id: 'ORD003',
    customer: {
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '9876543212',
    },
    products: [
      { name: 'Samsung Galaxy S21', quantity: 1, price: 32999 },
    ],
    total: 39428.82,
    status: 'Shipped',
    paymentMethod: 'Net Banking',
    shippingAddress: '789 FC Road, Pune, Maharashtra - 411004',
    orderDate: '2025-11-22',
    deliveryDate: null,
  },
  {
    _id: 'ORD004',
    customer: {
      name: 'Sneha Reddy',
      email: 'sneha@example.com',
      phone: '9876543213',
    },
    products: [
      { name: 'AirPods Pro', quantity: 2, price: 17999 },
    ],
    total: 42996.64,
    status: 'Delivered',
    paymentMethod: 'COD',
    shippingAddress: '321 Banjara Hills, Hyderabad, Telangana - 500034',
    orderDate: '2025-11-22',
    deliveryDate: '2025-11-23',
  },
  {
    _id: 'ORD005',
    customer: {
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '9876543214',
    },
    products: [
      { name: 'iPad Pro 11"', quantity: 1, price: 52999 },
    ],
    total: 62538.82,
    status: 'Processing',
    paymentMethod: 'UPI',
    shippingAddress: '654 Connaught Place, New Delhi, Delhi - 110001',
    orderDate: '2025-11-21',
    deliveryDate: null,
  },
  {
    _id: 'ORD006',
    customer: {
      name: 'Ananya Gupta',
      email: 'ananya@example.com',
      phone: '9876543215',
    },
    products: [
      { name: 'Dell XPS 13', quantity: 1, price: 58999 },
    ],
    total: 69598.82,
    status: 'Cancelled',
    paymentMethod: 'Card',
    shippingAddress: '987 Koramangala, Bangalore, Karnataka - 560034',
    orderDate: '2025-11-20',
    deliveryDate: null,
  },
];

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'Shipped':
        return <Truck className="w-5 h-5" />;
      case 'Processing':
        return <Clock className="w-5 h-5" />;
      case 'Cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const statusCounts = {
    all: orders.length,
    Processing: orders.filter((o) => o.status === 'Processing').length,
    Shipped: orders.filter((o) => o.status === 'Shipped').length,
    Delivered: orders.filter((o) => o.status === 'Delivered').length,
    Cancelled: orders.filter((o) => o.status === 'Cancelled').length,
  };

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
          <p className="text-gray-600">Track and manage all customer orders</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(statusCounts).map(([status, count], index) => (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setStatusFilter(status)}
              className={`bg-white rounded-xl shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                statusFilter === status ? 'ring-2 ring-primary-600' : ''
              }`}
            >
              <p className="text-sm text-gray-600 mb-1 capitalize">{status}</p>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none"
              >
                <option value="all">All Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Export Orders
            </button>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Products
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Payment
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-primary-600">{order._id}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-900">
                        {order.products[0].name}
                        {order.products.length > 1 && ` +${order.products.length - 1} more`}
                      </p>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">
                      ₹{order.total.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{order.paymentMethod}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{order.orderDate}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No orders found</p>
            </div>
          )}
        </motion.div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Order ID</p>
                  <p className="text-xl font-bold text-primary-600">{selectedOrder._id}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Name:</span> {selectedOrder.customer.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Email:</span> {selectedOrder.customer.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Phone:</span> {selectedOrder.customer.phone}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Address:</span> {selectedOrder.shippingAddress}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Products</h3>
                  <div className="space-y-2">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-900">
                          ₹{(product.price * product.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-900">Total Amount</span>
                    <span className="text-primary-600">₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.orderDate}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                    Update Status
                  </button>
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Print Invoice
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminOrders;
