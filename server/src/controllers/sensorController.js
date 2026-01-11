const Sensor = require('../models/Sensor');

// @desc    Get all sensors
// @route   GET /api/sensors
// @access  Public
exports.getSensors = async (req, res, next) => {
  try {
    const sensors = await Sensor.find();

    res.status(200).json({
      success: true,
      count: sensors.length,
      data: sensors
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a sensor (for seeding/testing)
// @route   POST /api/sensors
// @access  Private (Admin only)
exports.createSensor = async (req, res, next) => {
  try {
    const sensor = await Sensor.create(req.body);

    res.status(201).json({
      success: true,
      data: sensor
    });
  } catch (err) {
    next(err);
  }
};
