import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    dispatch(removeFromCart(productId));
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  const shippingCost = total > 50000 ? 0 : 500;
  const tax = total * 0.18; // 18% GST
  const finalTotal = total + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-gray-200 p-8 rounded-full">
              <ShoppingBag className="w-24 h-24 text-gray-400" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
              <p className="text-gray-600">{items.length} items in your cart</p>
            </div>
            {items.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                Clear Cart
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0];
              
              return (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 flex gap-6"
                >
                  {/* Product Image */}
                  <Link to={`/products/${item.product.slug}`} className="flex-shrink-0">
                    <img
                      src={primaryImage?.url || '/placeholder.jpg'}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <Link to={`/products/${item.product.slug}`}>
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors mb-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    
                    {item.product.specifications.brand && (
                      <p className="text-sm text-gray-500 mb-2">{item.product.specifications.brand}</p>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {item.product.specifications.condition}
                      </span>
                      <span className="text-sm text-gray-600">
                        SKU: {item.product.inventory.sku}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        
                        <span className="text-lg font-semibold w-12 text-center">
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.inventory.stock}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{item.product.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    {/* Stock Warning */}
                    {item.quantity >= item.product.inventory.stock && (
                      <p className="text-sm text-orange-600 mt-2">
                        Only {item.product.inventory.stock} items in stock
                      </p>
                    )}
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveItem(item.product._id, item.product.name)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors h-fit"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <p className="text-sm text-gray-500">
                    Add ₹{(50000 - total).toFixed(2)} more for FREE shipping!
                  </p>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST 18%)</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary-600">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-3 border-2 border-primary-600 text-primary-600 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </Link>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-3">We accept:</p>
                <div className="flex gap-2 flex-wrap">
                  <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">Visa</div>
                  <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">Mastercard</div>
                  <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">UPI</div>
                  <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">NetBanking</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
