import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card group cursor-pointer"
    >
      <Link to={`/products/${product._id}`}>
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={primaryImage?.url || '/placeholder.jpg'}
            alt={primaryImage?.alt || product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.specifications.condition === 'new' && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                New
              </span>
            )}
            {product.specifications.condition === 'refurbished' && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Refurbished
              </span>
            )}
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.inventory.stock < 5 && product.inventory.stock > 0 && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Only {product.inventory.stock} left
              </span>
            </div>
          )}
          
          {product.inventory.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          {product.specifications.brand && (
            <p className="text-sm text-gray-500 mb-1">{product.specifications.brand}</p>
          )}
          
          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          {product.shortDescription && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Rating */}
          {product.ratings && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.ratings?.average || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.ratings?.count || 0})
              </span>
            </div>
          )}

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{product.compareAtPrice.toFixed(2)}
                </p>
              )}
              <p className="text-2xl font-bold text-primary-600">
                ₹{product.price.toFixed(2)}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.inventory.stock === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
