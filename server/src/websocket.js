const { Server } = require('socket.io');
const Sensor = require('./models/Sensor');

let io = null;

function initializeWebSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ WebSocket client connected: ${socket.id}`);

    // Send initial sensor data
    sendSensorData(socket);

    // Set up interval to send updates every 5 seconds
    const updateInterval = setInterval(() => {
      sendSensorData(socket);
    }, 5000);

    socket.on('disconnect', () => {
      console.log(`❌ WebSocket client disconnected: ${socket.id}`);
      clearInterval(updateInterval);
    });

    // Handle client requests for specific sensor data
    socket.on('requestSensorData', async (sensorId) => {
      try {
        const sensor = await Sensor.findOne({ sensorId });
        if (sensor) {
          socket.emit('sensorData', {
            success: true,
            data: sensor
          });
        }
      } catch (error) {
        socket.emit('sensorData', {
          success: false,
          error: error.message
        });
      }
    });
  });

  console.log('✅ WebSocket server initialized');
  return io;
}

async function sendSensorData(socket) {
  try {
    // Fetch all sensors from database
    const sensors = await Sensor.find({ status: 'active' });
    
    // Simulate real-time updates by slightly modifying values
    const updatedSensors = sensors.map(sensor => {
      const variation = (Math.random() - 0.5) * 10; // ±5 variation
      return {
        ...sensor.toObject(),
        pm25: Math.max(0, sensor.pm25 + variation),
        pm10: Math.max(0, sensor.pm10 + variation * 1.2),
        aqi: Math.round(Math.max(0, sensor.aqi + variation * 2)),
        lastReading: new Date()
      };
    });

    socket.emit('sensorUpdate', {
      success: true,
      timestamp: new Date().toISOString(),
      data: updatedSensors
    });
  } catch (error) {
    console.error('Error sending sensor data:', error);
    socket.emit('sensorUpdate', {
      success: false,
      error: error.message
    });
  }
}

function broadcastSensorUpdate(sensorData) {
  if (io) {
    io.emit('sensorUpdate', {
      success: true,
      timestamp: new Date().toISOString(),
      data: sensorData
    });
  }
}

module.exports = {
  initializeWebSocket,
  broadcastSensorUpdate
};
