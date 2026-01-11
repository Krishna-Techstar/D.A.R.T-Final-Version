const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');

// Route files
const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');
const events = require('./routes/eventRoutes');
const sensors = require('./routes/sensorRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'HackNova API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      events: '/api/events',
      sensors: '/api/sensors'
    }
  });
});

// Mount routers
app.use('/api/auth', auth);
app.use('/api/posts', posts); // Complaint routes
app.use('/api/events', events);
app.use('/api/sensors', sensors);

// API root route (must be after router mounting to handle /api specifically)
app.get('/api', (req, res) => {
  res.json({ 
    message: 'HackNova API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      events: '/api/events',
      sensors: '/api/sensors'
    }
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
