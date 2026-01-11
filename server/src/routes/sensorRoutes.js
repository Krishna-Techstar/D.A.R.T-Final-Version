const express = require('express');
const { getSensors, createSensor } = require('../controllers/sensorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getSensors)
  .post(protect, authorize('admin'), createSensor);

module.exports = router;
