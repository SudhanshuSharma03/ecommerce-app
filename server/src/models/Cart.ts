import mongoose, { Schema, Model } from 'mongoose';
import { ICart } from '../types';

const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId as any,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [CartItemSchema],
    totalAmount: {
      type: Number,
      default: 0
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    }
  },
  {
    timestamps: true
  }
);

// Calculate total amount before saving
CartSchema.pre('save', function (this: any, next) {
  this.totalAmount = this.items.reduce((total: number, item: any) => {
    return total + (item.price * item.quantity);
  }, 0);
  next();
});

// TTL index to auto-delete expired carts
CartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
CartSchema.index({ user: 1 });

const Cart: Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
