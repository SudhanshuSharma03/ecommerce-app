import mongoose, { Schema, Model } from 'mongoose';
import { IReview } from '../types';

const ReviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: true
    },
    product: {
      type: Schema.Types.ObjectId as any,
      ref: 'Product',
      required: true
    },
    order: {
      type: Schema.Types.ObjectId as any,
      ref: 'Order'
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    comment: {
      type: String,
      required: [true, 'Please provide a comment'],
      maxlength: [1000, 'Comment cannot be more than 1000 characters']
    },
    images: [{ type: String }],
    isVerifiedPurchase: {
      type: Boolean,
      default: false
    },
    helpful: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
);

// One review per user per product
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });
ReviewSchema.index({ product: 1 });
ReviewSchema.index({ rating: 1 });

const Review: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
