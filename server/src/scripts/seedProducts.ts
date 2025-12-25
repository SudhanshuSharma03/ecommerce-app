import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
import Category from '../models/Category';

dotenv.config();

const categories = [
  {
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Refurbished and recycled smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
  },
  {
    name: 'Laptops',
    slug: 'laptops',
    description: 'Refurbished laptops and notebooks',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
  },
  {
    name: 'Tablets',
    slug: 'tablets',
    description: 'Pre-owned tablets and iPads',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400'
  },
  {
    name: 'Smartwatches',
    slug: 'smartwatches',
    description: 'Refurbished smartwatches and fitness trackers',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Phone cases, chargers, and more',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'
  }
];

const products = [
  {
    name: 'iPhone 13 Pro Max',
    slug: 'iphone-13-pro-max',
    description: 'Fully refurbished iPhone 13 Pro Max with 256GB storage. Excellent condition with minimal signs of use. Includes original accessories and 6-month warranty.',
    price: 65999,
    images: [
      { url: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800', alt: 'iPhone 13 Pro Max', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1632633728024-e1fd4bef561a?w=800', alt: 'iPhone 13 Pro Max Back' }
    ],
    category: 'smartphones',
    specifications: {
      brand: 'Apple',
      model: 'iPhone 13 Pro Max',
      condition: 'refurbished'
    },
    inventory: {
      stock: 15,
      sku: 'IP13PM-256-01'
    },
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy S21 Ultra',
    slug: 'samsung-galaxy-s21-ultra',
    description: 'Premium refurbished Samsung Galaxy S21 Ultra with stunning display and powerful performance. Thoroughly tested and certified.',
    price: 54999,
    images: [
      { url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800', alt: 'Samsung Galaxy S21 Ultra', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', alt: 'Samsung Galaxy S21 Ultra Side' }
    ],
    category: 'smartphones',
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy S21 Ultra',
      condition: 'refurbished'
    },
    inventory: {
      stock: 20,
      sku: 'SGS21U-256-01'
    },
    isFeatured: true
  },
  {
    name: 'MacBook Pro 14-inch M1',
    slug: 'macbook-pro-14-m1',
    description: 'Apple MacBook Pro with revolutionary M1 chip. Perfect for professionals and creators. Excellent condition with minimal usage.',
    price: 149999,
    images: [
      { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', alt: 'MacBook Pro 14', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800', alt: 'MacBook Pro Open' }
    ],
    category: 'laptops',
    specifications: {
      brand: 'Apple',
      model: 'MacBook Pro 14"',
      condition: 'refurbished'
    },
    inventory: {
      stock: 8,
      sku: 'MBP14-M1-512-01'
    },
    isFeatured: true
  },
  {
    name: 'Dell XPS 15',
    slug: 'dell-xps-15',
    description: 'Premium Windows laptop with stunning InfinityEdge display. Perfect for work and entertainment.',
    price: 89999,
    images: [
      { url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800', alt: 'Dell XPS 15', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800', alt: 'Dell XPS Keyboard' }
    ],
    category: 'laptops',
    specifications: {
      brand: 'Dell',
      model: 'XPS 15',
      condition: 'used'
    },
    inventory: {
      stock: 12,
      sku: 'DXPS15-512-01'
    },
    isFeatured: false
  },
  {
    name: 'iPad Pro 11-inch',
    slug: 'ipad-pro-11',
    description: 'Powerful iPad Pro with M1 chip. Perfect for productivity and creativity. Includes Apple Pencil support.',
    price: 59999,
    images: [
      { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', alt: 'iPad Pro 11', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1585790050230-5dd28404f1e8?w=800', alt: 'iPad Pro Side' }
    ],
    category: 'tablets',
    specifications: {
      brand: 'Apple',
      model: 'iPad Pro 11"',
      condition: 'refurbished'
    },
    inventory: {
      stock: 10,
      sku: 'IPP11-256-01'
    },
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy Tab S8',
    slug: 'samsung-galaxy-tab-s8',
    description: 'Versatile Android tablet with S Pen included. Great for productivity and entertainment.',
    price: 44999,
    images: [
      { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', alt: 'Samsung Tab S8', isPrimary: true }
    ],
    category: 'tablets',
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy Tab S8',
      condition: 'used'
    },
    inventory: {
      stock: 15,
      sku: 'SGT8-128-01'
    },
    isFeatured: false
  },
  {
    name: 'Apple Watch Series 7',
    slug: 'apple-watch-series-7',
    description: 'Advanced health and fitness features with stunning always-on display. Perfect condition.',
    price: 32999,
    images: [
      { url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800', alt: 'Apple Watch Series 7', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800', alt: 'Apple Watch Display' }
    ],
    category: 'smartwatches',
    specifications: {
      brand: 'Apple',
      model: 'Watch Series 7',
      condition: 'refurbished'
    },
    inventory: {
      stock: 25,
      sku: 'AW7-45-01'
    },
    isFeatured: true
  },
  {
    name: 'Samsung Galaxy Watch 4',
    slug: 'samsung-galaxy-watch-4',
    description: 'Comprehensive health tracking with Wear OS. Sleek design and long battery life.',
    price: 18999,
    images: [
      { url: 'https://images.unsplash.com/photo-1617625802912-cde586faf331?w=800', alt: 'Samsung Galaxy Watch 4', isPrimary: true }
    ],
    category: 'smartwatches',
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy Watch 4',
      condition: 'used'
    },
    inventory: {
      stock: 30,
      sku: 'SGW4-44-01'
    },
    isFeatured: false
  },
  {
    name: 'AirPods Pro 2nd Gen',
    slug: 'airpods-pro-2',
    description: 'Premium wireless earbuds with active noise cancellation. Excellent audio quality.',
    price: 19999,
    images: [
      { url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800', alt: 'AirPods Pro', isPrimary: true }
    ],
    category: 'accessories',
    specifications: {
      brand: 'Apple',
      model: 'AirPods Pro 2nd Gen',
      condition: 'refurbished'
    },
    inventory: {
      stock: 40,
      sku: 'APP2-01'
    },
    isFeatured: false
  },
  {
    name: 'OnePlus Nord 2',
    slug: 'oneplus-nord-2',
    description: 'Affordable 5G smartphone with flagship features. Great value for money.',
    price: 24999,
    images: [
      { url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', alt: 'OnePlus Nord 2', isPrimary: true }
    ],
    category: 'smartphones',
    specifications: {
      brand: 'OnePlus',
      model: 'Nord 2',
      condition: 'used'
    },
    inventory: {
      stock: 18,
      sku: 'OPN2-128-01'
    },
    isFeatured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing products and categories');

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Map category slugs to IDs
    const categoryMap: { [key: string]: any } = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Update products with category IDs
    const productsWithCategories = products.map(product => ({
      ...product,
      category: categoryMap[product.category]
    }));

    // Insert products
    const insertedProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Categories: ${insertedCategories.length}`);
    console.log(`   Products: ${insertedProducts.length}`);
    console.log('\n💡 You can now view these products on your website!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
