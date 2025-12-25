import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/db';
import { configureCloudinary } from './config/cloudinary';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/orders';
import categoryRoutes from './routes/categories';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Configure Cloudinary
configureCloudinary();

// Initialize express app
const app: Application = express();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// Security middleware
app.use(helmet());
app.use(mongoSanitize());

// CORS
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3001', 'http://localhost:3000'],
    credentials: true
  })
);

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

app.use('/api/', limiter);

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
    🚀 Server is running!
    📡 Environment: ${process.env.NODE_ENV || 'development'}
    🌐 Port: ${PORT}
    🔗 URL: http://localhost:${PORT}
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error, promise) => {
  console.error('❌❌❌ Unhandled Rejection ❌❌❌');
  console.error('Error message:', err.message);
  console.error('Error stack:', err.stack);
  console.error('Promise:', promise);
  // Don't exit so we can see what's happening
});

export default app;
