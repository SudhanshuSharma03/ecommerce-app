import { Request } from 'express';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  addresses: IAddress[];
  wishlist: string[];
  emailVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

export interface IAddress {
  _id?: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  price: number;
  compareAtPrice?: number;
  images: IProductImage[];
  specifications: IProductSpecifications;
  inventory: IInventory;
  ratings: IRatings;
  reviews: string[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  seo: ISEO;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductImage {
  url: string;
  publicId?: string;
  alt?: string;
  isPrimary: boolean;
}

export interface IProductSpecifications {
  brand?: string;
  model?: string;
  condition: 'new' | 'refurbished' | 'used';
  warranty?: string;
  yearManufactured?: number;
  functionalStatus?: string;
  recyclabilityScore?: number;
}

export interface IInventory {
  stock: number;
  sku?: string;
  lowStockThreshold: number;
}

export interface IRatings {
  average: number;
  count: number;
}

export interface ISEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  product: string;
  quantity: number;
  price: number;
  addedAt: Date;
}

export interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
  totalAmount: number;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  product: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface IShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface IPaymentInfo {
  method: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface IPricing {
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
}

export interface IStatusHistory {
  status: string;
  date: Date;
  note?: string;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  user: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentInfo: IPaymentInfo;
  pricing: IPricing;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  notes?: string;
  statusHistory: IStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  _id: string;
  user: string;
  product: string;
  order?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpful: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
  body: any;
  params: any;
  query: any;
}
