/**
 * Database Verification Script
 * Checks all collections and data in MongoDB
 */

const mongoose = require('mongoose');
require('dotenv').config();

async function verifyDatabase() {
  try {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  📊 DATABASE VERIFICATION REPORT');
    console.log('═══════════════════════════════════════════════════════\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;

    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(`📁 Total Collections: ${collections.length}\n`);

    // Check each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await db.collection(collectionName).countDocuments();
      console.log(`📂 ${collectionName}: ${count} documents`);

      // Show sample data for main collections
      if (['users', 'products', 'orders', 'carts', 'categories'].includes(collectionName)) {
        const samples = await db.collection(collectionName).find().limit(2).toArray();
        if (samples.length > 0) {
          console.log(`   Sample document:`);
          const sample = samples[0];
          
          // Show relevant fields based on collection
          if (collectionName === 'users') {
            console.log(`   - Name: ${sample.name}`);
            console.log(`   - Email: ${sample.email}`);
            console.log(`   - Role: ${sample.role}`);
            console.log(`   - Created: ${sample.createdAt}`);
          } else if (collectionName === 'products') {
            console.log(`   - Name: ${sample.name}`);
            console.log(`   - Price: ₹${sample.price}`);
            console.log(`   - Stock: ${sample.inventory?.stock || 0}`);
            console.log(`   - Category: ${sample.category}`);
          } else if (collectionName === 'orders') {
            console.log(`   - Order Number: ${sample.orderNumber}`);
            console.log(`   - Status: ${sample.status}`);
            console.log(`   - Total: ₹${sample.pricing?.total || 0}`);
            console.log(`   - Items: ${sample.items?.length || 0}`);
          } else if (collectionName === 'carts') {
            console.log(`   - User: ${sample.user}`);
            console.log(`   - Items: ${sample.items?.length || 0}`);
            console.log(`   - Total: ₹${sample.total || 0}`);
          } else if (collectionName === 'categories') {
            console.log(`   - Name: ${sample.name}`);
            console.log(`   - Slug: ${sample.slug}`);
          }
        }
      }
      console.log('');
    }

    // Database statistics
    const stats = await db.stats();
    console.log('═══════════════════════════════════════════════════════');
    console.log('  📊 DATABASE STATISTICS');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`Database: ${db.databaseName}`);
    console.log(`Collections: ${stats.collections}`);
    console.log(`Data Size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Storage Size: ${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Indexes: ${stats.indexes}`);
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('✅ Database verification complete!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

verifyDatabase();
