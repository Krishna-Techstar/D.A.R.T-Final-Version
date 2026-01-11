const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sensor = require('./src/models/Sensor');
const connectDB = require('./src/config/db');

dotenv.config();

const sensors = [
  {
    sensorId: 'SN-001',
    lat: 40.7128,
    lng: -74.0060,
    pm25: 78,
    pm10: 120,
    lastReading: new Date()
  },
  {
    sensorId: 'SN-002',
    lat: 40.7300,
    lng: -73.9900,
    pm25: 55,
    pm10: 90,
    lastReading: new Date()
  },
  {
    sensorId: 'SN-003',
    lat: 40.7500,
    lng: -73.9800,
    pm25: 160,
    pm10: 200,
    lastReading: new Date()
  }
];

const seedDB = async () => {
  try {
    // We MUST call connectDB() because it handles the logic for spinning up the in-memory server
    await connectDB(); 

    // Wait a moment for connection
    if (mongoose.connection.readyState !== 1) {
       console.log("Waiting for connection...");
       await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await Sensor.deleteMany();
    console.log('Sensors cleared');

    await Sensor.insertMany(sensors);
    console.log('Sensors seeded');

    // Do NOT exit process immediately if using in-memory DB in a real app, 
    // but here we are just seeding. 
    // HOWEVER: In-memory DB data is lost when process exits!
    // This seeding strategy is flawed for in-memory DB unless we run it AT STARTUP of the main app.
    
    console.log('NOTE: Since we are using In-Memory DB, this data will disappear when this script exits.');
    console.log('To persist data, the seeding must happen inside the main server startup or use a real DB.');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
