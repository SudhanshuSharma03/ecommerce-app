# E-Waste Commerce Platform

A modern, full-stack e-commerce platform for buying and selling electronic waste, built with React, TypeScript, Node.js, Express, and MongoDB.

## 🚀 Features

### User Features
- 🔐 User authentication (JWT-based)
- 🛍️ Product browsing with advanced search and filters
- 🛒 Shopping cart with persistent storage
- 💳 Secure checkout process
- 📦 Order tracking and history
- ⭐ Product reviews and ratings
- 💝 Wishlist functionality
- 👤 User profile management

### Admin Features
- 📊 Admin dashboard with analytics
- 📦 Product management (CRUD)
- 🔄 Order management and tracking
- 👥 User management
- 📂 Category management
- 📈 Sales reports

### Technical Features
- ⚡ Modern UI with Framer Motion animations
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🔒 Secure authentication and authorization
- 💾 MongoDB database with Mongoose ODM
- 🖼️ Image upload with Cloudinary
- 💰 Stripe payment integration
- ✨ Trending hover effects and micro-interactions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Routing
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image hosting
- **Stripe** - Payment processing

## 📁 Project Structure

```
e_commerced/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Route pages
│   │   ├── features/      # Redux slices
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Helper functions
│   │   └── animations/    # Animation configs
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/       # Configuration
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   ├── utils/        # Helper functions
│   │   └── types/        # TypeScript types
│   └── package.json
└── package.json          # Root package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd e_commerced
```

2. Install dependencies
```bash
npm run install:all
```

3. Set up environment variables

**Server (.env in server folder):**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

**Client (.env in client folder):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Run the development servers
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Build for Production

```bash
npm run build
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updateprofile` - Update profile
- `POST /api/auth/forgotpassword` - Forgot password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)

## 📝 License

MIT

## 👨‍💻 Author

Built with ❤️ for sustainable e-waste management
