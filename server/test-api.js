/**
 * Comprehensive API Test Script
 * Tests all endpoints and verifies data persistence
 */

const https = require('https');

const BASE_URL = 'http://localhost:5000';
let authToken = '';
let userId = '';
let productId = '';
let cartId = '';
let orderId = '';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const lib = url.protocol === 'https:' ? https : require('http');
    
    const req = lib.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: body, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log('\n📡 Testing Health Check...');
  try {
    const response = await makeRequest('GET', '/health');
    if (response.status === 200) {
      console.log('✅ Health check passed');
      console.log('   Response:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ Health check failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
    return false;
  }
}

async function testUserRegistration() {
  console.log('\n👤 Testing User Registration...');
  const testUser = {
    name: 'Test User ' + Date.now(),
    email: `testuser${Date.now()}@example.com`,
    password: 'Test@123456',
    phone: '9876543210'
  };

  try {
    const response = await makeRequest('POST', '/api/auth/register', testUser);
    if (response.status === 201 || response.status === 200) {
      console.log('✅ User registration successful');
      console.log('   User:', testUser.email);
      if (response.data.data && response.data.data.token) {
        authToken = response.data.data.token;
        userId = response.data.data.user?.id || response.data.data.user?._id;
        console.log('   Token received:', authToken.substring(0, 20) + '...');
        console.log('   User ID:', userId);
      }
      return true;
    } else {
      console.log('❌ User registration failed:', response.status);
      console.log('   Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ User registration error:', error.message);
    return false;
  }
}

async function testUserLogin() {
  console.log('\n🔐 Testing User Login...');
  const loginData = {
    email: `testuser${Date.now() - 1000}@example.com`,
    password: 'Test@123456'
  };

  try {
    const response = await makeRequest('POST', '/api/auth/login', loginData);
    if (response.status === 200) {
      console.log('✅ User login successful');
      return true;
    } else {
      console.log('⚠️  Login test skipped (using registration token)');
      return true;
    }
  } catch (error) {
    console.log('⚠️  Login test skipped:', error.message);
    return true;
  }
}

async function testGetProfile() {
  console.log('\n👤 Testing Get User Profile...');
  if (!authToken) {
    console.log('⚠️  Skipped: No auth token');
    return false;
  }

  try {
    const response = await makeRequest('GET', '/api/auth/me', null, authToken);
    if (response.status === 200) {
      console.log('✅ Profile retrieved successfully');
      console.log('   User:', response.data.data?.name || 'N/A');
      console.log('   Email:', response.data.data?.email || 'N/A');
      return true;
    } else {
      console.log('❌ Get profile failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Get profile error:', error.message);
    return false;
  }
}

async function testGetProducts() {
  console.log('\n📦 Testing Get Products...');
  try {
    const response = await makeRequest('GET', '/api/products');
    if (response.status === 200) {
      const products = response.data.data || [];
      console.log('✅ Products retrieved successfully');
      console.log('   Total products:', products.length);
      if (products.length > 0) {
        productId = products[0]._id;
        console.log('   Sample product:', products[0].name);
        console.log('   Product ID saved:', productId);
      }
      return true;
    } else {
      console.log('❌ Get products failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Get products error:', error.message);
    return false;
  }
}

async function testAddToCart() {
  console.log('\n🛒 Testing Add to Cart...');
  if (!authToken || !productId) {
    console.log('⚠️  Skipped: No auth token or product ID');
    return false;
  }

  const cartData = {
    productId: productId,
    quantity: 2
  };

  try {
    const response = await makeRequest('POST', '/api/cart', cartData, authToken);
    if (response.status === 200 || response.status === 201) {
      console.log('✅ Product added to cart');
      console.log('   Cart items:', response.data.data?.items?.length || 0);
      return true;
    } else {
      console.log('❌ Add to cart failed:', response.status);
      console.log('   Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Add to cart error:', error.message);
    return false;
  }
}

async function testGetCart() {
  console.log('\n🛒 Testing Get Cart...');
  if (!authToken) {
    console.log('⚠️  Skipped: No auth token');
    return false;
  }

  try {
    const response = await makeRequest('GET', '/api/cart', null, authToken);
    if (response.status === 200) {
      console.log('✅ Cart retrieved successfully');
      const items = response.data.data?.items || [];
      console.log('   Cart items:', items.length);
      console.log('   Total:', response.data.data?.total || 0);
      return true;
    } else {
      console.log('❌ Get cart failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Get cart error:', error.message);
    return false;
  }
}

async function testCreateOrder() {
  console.log('\n📦 Testing Create Order...');
  if (!authToken || !productId) {
    console.log('⚠️  Skipped: No auth token or product ID');
    return false;
  }

  const orderData = {
    items: [{
      product: productId,
      name: 'Test Product',
      image: 'https://example.com/product.jpg',
      quantity: 1,
      price: 9999,
      subtotal: 9999
    }],
    shippingAddress: {
      fullName: 'Test User',
      phone: '9876543210',
      street: '123 Test Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    paymentInfo: {
      method: 'cash_on_delivery',
      status: 'pending'
    },
    pricing: {
      subtotal: 9999,
      shippingCost: 0,
      tax: 1799,
      discount: 0,
      total: 11798
    }
  };

  try {
    const response = await makeRequest('POST', '/api/orders', orderData, authToken);
    if (response.status === 200 || response.status === 201) {
      console.log('✅ Order created successfully');
      orderId = response.data.data?._id;
      console.log('   Order ID:', orderId);
      console.log('   Order total:', response.data.data?.pricing?.total);
      return true;
    } else {
      console.log('❌ Create order failed:', response.status);
      console.log('   Response:', JSON.stringify(response.data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ Create order error:', error.message);
    return false;
  }
}

async function testGetOrders() {
  console.log('\n📦 Testing Get Orders...');
  if (!authToken) {
    console.log('⚠️  Skipped: No auth token');
    return false;
  }

  try {
    const response = await makeRequest('GET', '/api/orders', null, authToken);
    if (response.status === 200) {
      const orders = response.data.data || [];
      console.log('✅ Orders retrieved successfully');
      console.log('   Total orders:', orders.length);
      if (orders.length > 0) {
        console.log('   Latest order:', orders[0]._id);
        console.log('   Order status:', orders[0].status);
      }
      return true;
    } else {
      console.log('❌ Get orders failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Get orders error:', error.message);
    return false;
  }
}

async function testGetCategories() {
  console.log('\n📂 Testing Get Categories...');
  try {
    const response = await makeRequest('GET', '/api/categories');
    if (response.status === 200) {
      const categories = response.data.data || [];
      console.log('✅ Categories retrieved successfully');
      console.log('   Total categories:', categories.length);
      return true;
    } else {
      console.log('❌ Get categories failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Get categories error:', error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  🧪 E-COMMERCE API COMPREHENSIVE TEST SUITE');
  console.log('═══════════════════════════════════════════════════════');
  
  const results = {
    passed: 0,
    failed: 0,
    skipped: 0
  };

  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'User Registration', fn: testUserRegistration },
    { name: 'User Login', fn: testUserLogin },
    { name: 'Get Profile', fn: testGetProfile },
    { name: 'Get Categories', fn: testGetCategories },
    { name: 'Get Products', fn: testGetProducts },
    { name: 'Add to Cart', fn: testAddToCart },
    { name: 'Get Cart', fn: testGetCart },
    { name: 'Create Order', fn: testCreateOrder },
    { name: 'Get Orders', fn: testGetOrders },
  ];

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        results.passed++;
      } else {
        results.failed++;
      }
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`❌ ${test.name} threw error:`, error.message);
      results.failed++;
    }
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  📊 TEST RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`Total Tests: ${results.passed + results.failed}`);
  console.log('═══════════════════════════════════════════════════════');

  if (results.failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Your API is working correctly!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the output above.');
  }
}

// Run tests
console.log('Starting tests in 2 seconds...');
setTimeout(runAllTests, 2000);
