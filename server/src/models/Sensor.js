const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String
  },
  pm1: {
    type: Number,
    default: 0
  },
  pm25: {
    type: Number,
    required: true
  },
  pm10: {
    type: Number,
    required: true
  },
  o3: {
    type: Number,
    default: 0
  },
  no2: {
    type: Number,
    default: 0
  },
  so2: {
    type: Number,
    default: 0
  },
  co: {
    type: Number,
    default: 0
  },
  temperature: {
    type: Number,
    default: 0
  },
  pressure: {
    type: Number,
    default: 0
  },
  humidity: {
    type: Number,
    default: 0
  },
  altitude: {
    type: Number,
    default: 0
  },
  speed: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  aqi: {
    type: Number,
    default: 0
  },
  lastReading: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate AQI based on PM2.5 (simplified AQI calculation)
sensorSchema.methods.calculateAQI = function() {
  const pm25 = this.pm25 || 0;
  
  // Simplified AQI calculation based on PM2.5
  // AQI scale: 0-50 (Good), 51-100 (Moderate), 101-150 (Unhealthy for Sensitive Groups), 
  //            151-200 (Unhealthy), 201-300 (Very Unhealthy), 300+ (Hazardous)
  
  if (pm25 <= 12) {
    // Good: 0-50
    this.aqi = Math.round((pm25 / 12) * 50);
  } else if (pm25 <= 35.4) {
    // Moderate: 51-100
    this.aqi = Math.round(50 + ((pm25 - 12) / (35.4 - 12)) * 50);
  } else if (pm25 <= 55.4) {
    // Unhealthy for Sensitive Groups: 101-150
    this.aqi = Math.round(100 + ((pm25 - 35.4) / (55.4 - 35.4)) * 50);
  } else if (pm25 <= 150.4) {
    // Unhealthy: 151-200
    this.aqi = Math.round(150 + ((pm25 - 55.4) / (150.4 - 55.4)) * 50);
  } else if (pm25 <= 250.4) {
    // Very Unhealthy: 201-300
    this.aqi = Math.round(200 + ((pm25 - 150.4) / (250.4 - 150.4)) * 100);
  } else {
    // Hazardous: 301+
    this.aqi = Math.round(300 + ((pm25 - 250.4) / (350.4 - 250.4)) * 100);
    if (this.aqi > 500) this.aqi = 500; // Cap at 500
  }
  
  return this.aqi;
};

// Calculate AQI before saving
sensorSchema.pre('save', function(next) {
  if (this.isModified('pm25') || this.isNew) {
    this.calculateAQI();
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Sensor', sensorSchema);
