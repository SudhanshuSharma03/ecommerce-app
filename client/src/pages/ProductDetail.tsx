import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Star,
  Package,
  Shield,
  TruckIcon,
  ArrowLeft,
  Check,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import type { Product } from '../types';

// Extended product type for detail page with populated fields
interface ProductDetail extends Omit<Product, 'category' | 'ratings'> {
  category: { _id: string; name: string } | string;
  rating?: { average: number; count: number };
  ratings?: { average: number; count: number };
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.getProductById(id!);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await api.addToCart({ productId: product._id, quantity });
      // Convert product detail to cart format
      const cartProduct: Product = {
        ...product,
        slug: (product as any).slug || product.name.toLowerCase().replace(/\s+/g, '-'),
        category: typeof product.category === 'object' ? (product.category as any).slug : product.category,
        ratings: product.rating || product.ratings,
        isActive: product.isActive !== undefined ? product.isActive : true,
        isFeatured: product.isFeatured !== undefined ? product.isFeatured : false,
        createdAt: product.createdAt || new Date().toISOString(),
        updatedAt: product.updatedAt || new Date().toISOString(),
      };
      dispatch(addToCart(cartProduct));
      toast.success('Added to cart!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <Link to="/products" className="text-primary-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const availableStock = product.inventory.stock;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden aspect-square">
              <img
                src={product.images[selectedImage]?.url || primaryImage.url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category */}
            {typeof product.category === 'object' && (
              <Link
                to={`/products?category=${product.category._id}`}
                className="inline-block text-sm text-primary-600 hover:underline"
              >
                {product.category.name}
              </Link>
            )}

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            {(product.rating || product.ratings) && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor((product.rating?.average || product.ratings?.average || 0))
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {((product.rating?.average || product.ratings?.average || 0).toFixed(1))} ({(product.rating?.count || product.ratings?.count || 0)} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="bg-gray-100 rounded-lg p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary-600">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-gray-500">inclusive of all taxes</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Brand: {product.specifications.brand}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Model: {product.specifications.model}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">
                    Condition: {product.specifications.condition}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">
                    Warranty: {product.specifications.warranty} months
                  </span>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                availableStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span className="font-medium">
                {availableStock > 0 ? `${availableStock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            {availableStock > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x-2 border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={availableStock === 0}
                className="flex-1 bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <TruckIcon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Delivery</p>
              </div>
              <div className="text-center">
                <Package className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Easy Returns</p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
