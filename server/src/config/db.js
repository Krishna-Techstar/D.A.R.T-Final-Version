const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;
  let isConnected = false;

  // 1. Try connecting to the provided URI if it looks somewhat valid
  // We check for common placeholders, but if the user provided a real URI (even with cluster0), we try it.
  if (mongoUri && !mongoUri.includes('<username>') && !mongoUri.includes('<password>') && !mongoUri.includes('...')) {
    try {
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      isConnected = true;
    } catch (error) {
      console.log(`⚠️  Failed to connect to provided MongoDB URI: ${error.message}`);
      console.log('� Switching to fallback In-Memory Database...');
    }
  } else {
    console.log('⚠️  MongoDB URI missing or invalid (contains placeholders).');
    console.log('🔄 Switching to fallback In-Memory Database...');
  }

  // 2. Fallback to In-Memory if not connected
  if (!isConnected) {
    try {
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      
      console.log('🚀 Starting In-Memory MongoDB Instance...');
      
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ In-Memory MongoDB running at: ${memoryUri}`);
      
      // Update env for other parts of the app
      process.env.MONGO_URI = memoryUri;
    } catch (error) {
      console.error(`❌ Critical Error: Could not start In-Memory MongoDB: ${error.message}`);
      // Only exit if even the fallback fails
      process.exit(1);
    }
  }
};

module.exports = connectDB;
