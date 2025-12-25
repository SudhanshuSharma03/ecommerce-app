import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
  addAddress,
  updateAddress,
  deleteAddress,
  toggleWishlist,
  googleAuth
} from '../controllers/authController';
import { protect } from '../middleware/auth';
import { registerValidation, loginValidation } from '../middleware/validation';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
// Social login
router.post('/google', googleAuth);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updateprofile', protect, updateProfile);
router.put('/updatepassword', protect, updatePassword);

// Address routes
router.post('/addresses', protect, addAddress);
router.put('/addresses/:addressId', protect, updateAddress);
router.delete('/addresses/:addressId', protect, deleteAddress);

// Wishlist routes
router.post('/wishlist/:productId', protect, toggleWishlist);

export default router;
