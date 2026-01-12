app.get("/health", (req, res) => {
  res.json({ status: "Backend is alive 🚀" });
});

const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const app = require("./src/app");
const Sensor = require("./src/models/Sensor");
const { initializeWebSocket } = require("./src/websocket");

// Load env vars
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server first, then connect to database
const server = app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
  console.log(`📡 API available at http://localhost:${PORT}/api`);

  // Initialize WebSocket server
  initializeWebSocket(server);
  console.log(`🔌 WebSocket server initialized on port ${PORT}`);
});

// Connect to database and seed
connectDB()
  .then(async () => {
    console.log("✅ Database connected");

    // Check if using in-memory DB or if DB is empty, then seed
    try {
      const count = await Sensor.countDocuments();
      if (count === 0) {
        console.log("🌱 Seeding database with Navi Mumbai sensor data...");

        // Navi Mumbai area coordinates
        const sensors = [
          {
            sensorId: "SN-001",
            name: "Kharghar Sector 12",
            lat: 19.0312,
            lng: 73.0656,
            location: {
              address: "Kharghar Sector 12, Navi Mumbai",
              city: "Kharghar",
              state: "Maharashtra",
              country: "India",
            },
            pm1: 50 + Math.floor(Math.random() * 25),
            pm25: 85 + Math.floor(Math.random() * 30),
            pm10: 135 + Math.floor(Math.random() * 40),
            o3: 48 + Math.floor(Math.random() * 15),
            no2: 35 + Math.floor(Math.random() * 20),
            so2: 22 + Math.floor(Math.random() * 15),
            co: 1.3 + Math.random() * 0.5,
            temperature: 32 + Math.floor(Math.random() * 3),
            pressure: 1013 + Math.floor(Math.random() * 10) - 5,
            humidity: 65 + Math.floor(Math.random() * 15),
            altitude: Math.floor(Math.random() * 50),
            speed: Math.floor(Math.random() * 5),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-002",
            name: "MIDC Mahape",
            lat: 19.1178,
            lng: 73.0189,
            location: {
              address: "MIDC Industrial Area, Mahape, Navi Mumbai",
              city: "Mahape",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 105 + Math.floor(Math.random() * 40),
            pm10: 165 + Math.floor(Math.random() * 50),
            o3: 55 + Math.floor(Math.random() * 20),
            no2: 42 + Math.floor(Math.random() * 25),
            so2: 28 + Math.floor(Math.random() * 18),
            co: 1.6 + Math.random() * 0.6,
            temperature: 33 + Math.floor(Math.random() * 4),
            humidity: 70 + Math.floor(Math.random() * 20),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-003",
            name: "MIDC Taloja",
            lat: 19.0956,
            lng: 73.0934,
            location: {
              address: "MIDC Industrial Area, Taloja, Navi Mumbai",
              city: "Taloja",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 110 + Math.floor(Math.random() * 45),
            pm10: 175 + Math.floor(Math.random() * 55),
            o3: 58 + Math.floor(Math.random() * 22),
            no2: 45 + Math.floor(Math.random() * 28),
            so2: 30 + Math.floor(Math.random() * 20),
            co: 1.7 + Math.random() * 0.7,
            temperature: 34 + Math.floor(Math.random() * 4),
            humidity: 72 + Math.floor(Math.random() * 22),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-004",
            name: "Belapur CBD",
            lat: 19.0162,
            lng: 73.0423,
            location: {
              address: "CBD Belapur, Navi Mumbai",
              city: "Belapur",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 75 + Math.floor(Math.random() * 28),
            pm10: 120 + Math.floor(Math.random() * 38),
            o3: 43 + Math.floor(Math.random() * 14),
            no2: 30 + Math.floor(Math.random() * 17),
            so2: 19 + Math.floor(Math.random() * 13),
            co: 1.1 + Math.random() * 0.4,
            temperature: 31 + Math.floor(Math.random() * 3),
            humidity: 60 + Math.floor(Math.random() * 18),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-005",
            name: "Seawoods Darave",
            lat: 19.0198,
            lng: 73.0556,
            location: {
              address: "Seawoods Darave, Navi Mumbai",
              city: "Seawoods",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 68 + Math.floor(Math.random() * 22),
            pm10: 108 + Math.floor(Math.random() * 32),
            o3: 40 + Math.floor(Math.random() * 10),
            no2: 28 + Math.floor(Math.random() * 15),
            so2: 18 + Math.floor(Math.random() * 10),
            co: 1.0 + Math.random() * 0.3,
            temperature: 30 + Math.floor(Math.random() * 3),
            humidity: 58 + Math.floor(Math.random() * 15),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-006",
            name: "Nerul Sector 19",
            lat: 19.0423,
            lng: 73.0823,
            location: {
              address: "Nerul Sector 19, Navi Mumbai",
              city: "Nerul",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 88 + Math.floor(Math.random() * 32),
            pm10: 142 + Math.floor(Math.random() * 42),
            o3: 50 + Math.floor(Math.random() * 16),
            no2: 36 + Math.floor(Math.random() * 20),
            so2: 23 + Math.floor(Math.random() * 16),
            co: 1.4 + Math.random() * 0.5,
            temperature: 32 + Math.floor(Math.random() * 3),
            humidity: 68 + Math.floor(Math.random() * 22),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-007",
            name: "Juinagar",
            lat: 19.0589,
            lng: 73.0523,
            location: {
              address: "Juinagar Station Area, Navi Mumbai",
              city: "Juinagar",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 82 + Math.floor(Math.random() * 28),
            pm10: 130 + Math.floor(Math.random() * 38),
            o3: 46 + Math.floor(Math.random() * 14),
            no2: 33 + Math.floor(Math.random() * 18),
            so2: 21 + Math.floor(Math.random() * 14),
            co: 1.2 + Math.random() * 0.4,
            temperature: 31 + Math.floor(Math.random() * 3),
            humidity: 63 + Math.floor(Math.random() * 18),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-008",
            name: "Sanpada",
            lat: 19.0723,
            lng: 73.0223,
            location: {
              address: "Sanpada Station Area, Navi Mumbai",
              city: "Sanpada",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 79 + Math.floor(Math.random() * 26),
            pm10: 125 + Math.floor(Math.random() * 35),
            o3: 44 + Math.floor(Math.random() * 13),
            no2: 31 + Math.floor(Math.random() * 17),
            so2: 20 + Math.floor(Math.random() * 12),
            co: 1.15 + Math.random() * 0.35,
            temperature: 31 + Math.floor(Math.random() * 3),
            humidity: 61 + Math.floor(Math.random() * 17),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-009",
            name: "Vashi Sector 17",
            lat: 19.0812,
            lng: 72.9989,
            location: {
              address: "Vashi Sector 17, Navi Mumbai",
              city: "Vashi",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 92 + Math.floor(Math.random() * 35),
            pm10: 148 + Math.floor(Math.random() * 45),
            o3: 52 + Math.floor(Math.random() * 18),
            no2: 38 + Math.floor(Math.random() * 22),
            so2: 25 + Math.floor(Math.random() * 18),
            co: 1.5 + Math.random() * 0.6,
            temperature: 33 + Math.floor(Math.random() * 3),
            humidity: 70 + Math.floor(Math.random() * 20),
            status: "active",
            lastReading: new Date(),
          },
          {
            sensorId: "SN-010",
            name: "Kharghar Station",
            lat: 19.0278,
            lng: 73.0612,
            location: {
              address: "Kharghar Railway Station Area, Navi Mumbai",
              city: "Kharghar",
              state: "Maharashtra",
              country: "India",
            },
            pm25: 95 + Math.floor(Math.random() * 38),
            pm10: 152 + Math.floor(Math.random() * 48),
            o3: 54 + Math.floor(Math.random() * 19),
            no2: 40 + Math.floor(Math.random() * 24),
            so2: 26 + Math.floor(Math.random() * 19),
            co: 1.55 + Math.random() * 0.65,
            temperature: 33 + Math.floor(Math.random() * 3),
            humidity: 72 + Math.floor(Math.random() * 21),
            status: "active",
            lastReading: new Date(),
          },
        ];

        // Calculate AQI for each sensor before inserting
        for (let sensor of sensors) {
          const tempSensor = new Sensor(sensor);
          sensor.aqi = tempSensor.calculateAQI();
        }

        await Sensor.insertMany(sensors);
        console.log(
          "✅ Database seeded with",
          sensors.length,
          "sensors in Navi Mumbai!"
        );
      } else {
        console.log(`✅ Database already has ${count} sensors`);
      }
    } catch (error) {
      console.error("❌ Error seeding database:", error.message);
    }
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error.message);
    console.log(
      "⚠️  Server is still running, but database operations will fail"
    );
  });

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  console.error(err.stack);
  // Don't exit on unhandled rejection in development
  if (process.env.NODE_ENV === "production") {
    server.close(() => process.exit(1));
  }
});
