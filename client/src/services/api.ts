import axios, { AxiosError, type AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth APIs
  async register(data: { name: string; email: string; password: string }) {
    const response = await this.api.post('/auth/register', data);
    return response.data;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.api.post('/auth/login', data);
    return response.data;
  }

  async googleAuth(data: { idToken: string }) {
    const response = await this.api.post('/auth/google', data);
    return response.data;
  }

  async getProfile() {
    const response = await this.api.get('/auth/profile');
    return response.data;
  }

  // Product APIs
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
    sort?: string;
  }) {
    const response = await this.api.get('/products', { params });
    return response.data;
  }

  async getProduct(slug: string) {
    const response = await this.api.get(`/products/${slug}`);
    return response.data;
  }

  async getProductById(id: string) {
    const response = await this.api.get(`/products/${id}`);
    return response.data;
  }

  async getFeaturedProducts() {
    const response = await this.api.get('/products/featured');
    return response.data;
  }

  // Cart APIs
  async getCart() {
    const response = await this.api.get('/cart');
    return response.data;
  }

  async addToCart(data: { productId: string; quantity: number }) {
    const response = await this.api.post('/cart', data);
    return response.data;
  }

  async updateCartItem(productId: string, quantity: number) {
    const response = await this.api.put('/cart/update', { productId, quantity });
    return response.data;
  }

  async removeFromCart(productId: string) {
    const response = await this.api.delete(`/cart/remove/${productId}`);
    return response.data;
  }

  async clearCart() {
    const response = await this.api.delete('/cart/clear');
    return response.data;
  }

  // Order APIs
  async createOrder(data: any) {
    const response = await this.api.post('/orders', data);
    return response.data;
  }

  async getOrders() {
    const response = await this.api.get('/orders');
    return response.data;
  }

  async getOrder(orderId: string) {
    const response = await this.api.get(`/orders/${orderId}`);
    return response.data;
  }

  // Category APIs
  async getCategories() {
    const response = await this.api.get('/categories');
    return response.data;
  }

  // Admin APIs
  async createProduct(data: FormData) {
    const response = await this.api.post('/products', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updateProduct(id: string, data: FormData) {
    const response = await this.api.put(`/products/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteProduct(id: string) {
    const response = await this.api.delete(`/products/${id}`);
    return response.data;
  }
}

export default new ApiService();
