export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string | { _id: string; name: string; slug: string };
  price: number;
  compareAtPrice?: number;
  images: Array<{
    url: string;
    alt?: string;
    isPrimary: boolean;
  }>;
  specifications: {
    brand?: string;
    model?: string;
    condition: 'new' | 'refurbished' | 'used';
    warranty?: string;
    yearManufactured?: number;
    functionalStatus?: string;
    recyclabilityScore?: number;
  };
  inventory: {
    stock: number;
    sku?: string;
  };
  ratings?: {
    average: number;
    count: number;
  };
  reviews?: any[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalAmount: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: Array<{
    product: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentInfo: {
    method: string;
    transactionId?: string;
    status: 'pending' | 'completed' | 'failed';
  };
  pricing: {
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  isActive: boolean;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
}
