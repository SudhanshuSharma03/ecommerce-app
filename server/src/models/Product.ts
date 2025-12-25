import mongoose, { Schema, Model } from 'mongoose';
import { IProduct } from '../types';

const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String },
  alt: { type: String },
  isPrimary: { type: Boolean, default: false }
});

const ProductSpecificationsSchema = new Schema({
  brand: { type: String },
  model: { type: String },
  condition: {
    type: String,
    enum: ['new', 'refurbished', 'used'],
    required: true,
    default: 'used'
  },
  warranty: { type: String },
  yearManufactured: { type: Number },
  functionalStatus: { type: String },
  recyclabilityScore: { type: Number, min: 0, max: 100 }
});

const InventorySchema = new Schema({
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  sku: { type: String, unique: true, sparse: true },
  lowStockThreshold: { type: Number, default: 5 }
});

const RatingsSchema = new Schema({
  average: { type: Number, default: 0, min: 0, max: 5 },
  count: { type: Number, default: 0 }
});

const SEOSchema = new Schema({
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: [{ type: String }]
});

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [200, 'Product name cannot be more than 200 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description']
    },
    shortDescription: {
      type: String,
      maxlength: [500, 'Short description cannot be more than 500 characters']
    },
    category: {
      type: Schema.Types.ObjectId as any,
      ref: 'Category',
      required: [true, 'Please provide a category']
    },
    subcategory: {
      type: String
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative']
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare price cannot be negative']
    },
    images: [ProductImageSchema],
    specifications: ProductSpecificationsSchema,
    inventory: InventorySchema,
    ratings: RatingsSchema,
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    tags: [{ type: String }],
    seo: SEOSchema
  },
  {
    timestamps: true
  }
);

// Generate slug from name before saving
ProductSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    (this as any).slug = (this as any).name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Indexes
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ 'ratings.average': -1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
