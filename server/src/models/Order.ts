import mongoose, { Schema, Model } from 'mongoose';
import { IOrder } from '../types';

const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  }
});

const ShippingAddressSchema = new Schema({
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true }
});

const PaymentInfoSchema = new Schema({
  method: {
    type: String,
    required: true,
    enum: ['card', 'paypal', 'bank_transfer', 'cash_on_delivery']
  },
  transactionId: { type: String },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
});

const PricingSchema = new Schema({
  subtotal: { type: Number, required: true, min: 0 },
  tax: { type: Number, default: 0, min: 0 },
  shippingCost: { type: Number, default: 0, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 0 }
});

const StatusHistorySchema = new Schema({
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
  note: { type: String }
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: true
    },
    items: [OrderItemSchema],
    shippingAddress: ShippingAddressSchema,
    paymentInfo: PaymentInfoSchema,
    pricing: PricingSchema,
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    trackingNumber: { type: String },
    notes: { type: String },
    statusHistory: [StatusHistorySchema]
  },
  {
    timestamps: true
  }
);

// Generate order number before saving
OrderSchema.pre('save', async function (this: any, next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  
  // Add to status history
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      date: new Date(),
      note: ''
    });
  }
  
  next();
});

// Indexes
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ user: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
