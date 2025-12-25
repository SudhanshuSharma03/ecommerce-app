import { Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../types';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let cart = await Cart.findOne({ user: req.user?._id }).populate({
      path: 'items.product',
      select: 'name price images inventory.stock'
    });

    if (!cart) {
      cart = await Cart.create({ user: req.user?._id, items: [] });
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;

    // Check product exists and has stock
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    if (product.inventory.stock < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
      return;
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user?._id, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        addedAt: new Date()
      });
    }

    await cart.save();
    await cart.populate({
      path: 'items.product',
      select: 'name price images inventory.stock'
    });

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update cart item
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
      return;
    }

    const item = cart.items.find(i => (i as any)._id?.toString() === req.params.itemId);
    if (!item) {
      res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
      return;
    }

    // Check stock
    const product = await Product.findById(item.product);
    if (product && product.inventory.stock < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
      return;
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate({
      path: 'items.product',
      select: 'name price images inventory.stock'
    });

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
      return;
    }

    cart.items = cart.items.filter(
      item => (item as any)._id?.toString() !== req.params.itemId
    );

    await cart.save();
    await cart.populate({
      path: 'items.product',
      select: 'name price images inventory.stock'
    });

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
      return;
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
