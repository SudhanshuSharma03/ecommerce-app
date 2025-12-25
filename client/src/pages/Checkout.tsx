import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, User, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearCart } from '../store/slices/cartSlice';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  paymentMethod: z.enum(['card', 'upi', 'cod', 'netbanking']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card',
    },
  });

  const paymentMethod = watch('paymentMethod');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products before checkout</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </button>
        </motion.div>
      </div>
    );
  }

  const shippingCost = total > 50000 ? 0 : 500;
  const tax = total * 0.18;
  const finalTotal = total + shippingCost + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Clear cart
      dispatch(clearCart());
      
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { 
        state: { 
          orderData: data,
          orderTotal: finalTotal,
          orderNumber: `ORD${Date.now()}`
        } 
      });
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Review' },
            ].map((item, index) => (
              <div key={item.num} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                    step >= item.num
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {item.num}
                </div>
                <span className="ml-2 font-medium text-gray-700">{item.label}</span>
                {index < 2 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      step > item.num ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Information */}
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register('fullName')}
                          type="text"
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none`}
                          placeholder="John Doe"
                          disabled={step > 1}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register('email')}
                          type="email"
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none`}
                          placeholder="john@example.com"
                          disabled={step > 1}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none`}
                          placeholder="9876543210"
                          disabled={step > 1}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          {...register('address')}
                          rows={3}
                          className={`w-full pl-10 pr-3 py-3 border ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none`}
                          placeholder="Street address"
                          disabled={step > 1}
                        />
                      </div>
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        {...register('city')}
                        type="text"
                        className={`w-full px-3 py-3 border ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none`}
                        placeholder="Mumbai"
                        disabled={step > 1}
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        {...register('state')}
                        type="text"
                        className={`w-full px-3 py-3 border ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none`}
                        placeholder="Maharashtra"
                        disabled={step > 1}
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode
                      </label>
                      <input
                        {...register('pincode')}
                        type="text"
                        className={`w-full px-3 py-3 border ${
                          errors.pincode ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none`}
                        placeholder="400001"
                        disabled={step > 1}
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                      )}
                    </div>
                  </div>

                  {step === 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  )}
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
                      { value: 'upi', label: 'UPI', icon: '📱' },
                      { value: 'netbanking', label: 'Net Banking', icon: '🏦' },
                      { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === method.value
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          {...register('paymentMethod')}
                          type="radio"
                          value={method.value}
                          className="w-5 h-5 text-primary-600"
                          disabled={step > 2}
                        />
                        <span className="ml-3 text-2xl">{method.icon}</span>
                        <span className="ml-3 font-medium text-gray-900">{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {step === 2 && (
                    <div className="mt-6 flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                      >
                        Review Order
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>

                  <div className="space-y-4">
                    {items.map((item) => {
                      const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0];
                      return (
                        <div key={item.product._id} className="flex gap-4 pb-4 border-b">
                          <img
                            src={primaryImage?.url}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-grow">
                            <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-primary-600">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      disabled={isProcessing}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-md p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
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

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 font-medium">
                    🎉 You're saving ₹{items.reduce((sum, item) => {
                      const savings = item.product.compareAtPrice ? 
                        (item.product.compareAtPrice - item.product.price) * item.quantity : 0;
                      return sum + savings;
                    }, 0).toFixed(2)}!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
