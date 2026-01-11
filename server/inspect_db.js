const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Post = require('./src/models/Post');
const Event = require('./src/models/Event');
const Sensor = require('./src/models/Sensor');

dotenv.config();

const inspectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\n✅ MongoDB Connected: ${conn.connection.host}`);
    console.log('Database Name:', conn.connection.name);

    console.log('\n--- COLLECTION STATS ---');
    
    // Users
    const userCount = await User.countDocuments();
    console.log(`\nUsers: ${userCount}`);
    if (userCount > 0) {
      const user = await User.findOne().select('-password');
      console.log('Sample User:', JSON.stringify(user, null, 2));
    }

    // Posts
    const postCount = await Post.countDocuments();
    console.log(`\nPosts: ${postCount}`);
    if (postCount > 0) {
      const post = await Post.findOne();
      console.log('Sample Post:', JSON.stringify(post, null, 2));
    }

    // Events
    const eventCount = await Event.countDocuments();
    console.log(`\nEvents: ${eventCount}`);
    if (eventCount > 0) {
      const event = await Event.findOne();
      console.log('Sample Event:', JSON.stringify(event, null, 2));
    }

    // Sensors
    const sensorCount = await Sensor.countDocuments();
    console.log(`\nSensors: ${sensorCount}`);
    if (sensorCount > 0) {
      const sensor = await Sensor.findOne();
      console.log('Sample Sensor:', JSON.stringify(sensor, null, 2));
    }

    process.exit();
  } catch (err) {
    console.error(`\n❌ Error: ${err.message}`);
    process.exit(1);
  }
};

inspectDB();
