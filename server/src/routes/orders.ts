import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStatistics
} from '../controllers/orderController';
import { protect, authorize } from '../middleware/auth';
import { orderValidation } from '../middleware/validation';

const router = express.Router();

// User routes
router.post('/', protect, orderValidation, createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/cancel', protect, cancelOrder);

// Admin routes
router.get('/admin/all', protect, authorize('admin'), getAllOrders);
router.get('/admin/statistics', protect, authorize('admin'), getOrderStatistics);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

export default router;
