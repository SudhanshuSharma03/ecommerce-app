import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { useEffect } from 'react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderNumber, orderTotal } = orderData;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-green-100 p-6 rounded-full">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-xl p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="text-xl font-bold text-primary-600">{orderNumber}</p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">₹{orderTotal?.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-left">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Package className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Order Processing</h3>
                  <p className="text-sm text-gray-600">
                    We're preparing your items for shipment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Truck className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Shipping</h3>
                  <p className="text-sm text-gray-600">
                    Your order will be shipped within 2-3 business days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-left">
                <div className="bg-primary-100 p-3 rounded-full">
                  <Home className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Estimated delivery in 5-7 business days
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Email Confirmation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
          >
            <p className="text-sm text-blue-800">
              📧 A confirmation email has been sent to your registered email address
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/products">
              <button className="w-full sm:w-auto px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Continue Shopping
              </button>
            </Link>
            <Link to="/">
              <button className="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Back to Home
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
