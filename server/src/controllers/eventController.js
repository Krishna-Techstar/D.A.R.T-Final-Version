const Event = require('../models/Event');
const User = require('../models/User');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (NGO only)
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      hostedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('hostedBy', 'name');

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Join an event
// @route   PUT /api/events/:id/join
// @access  Private
exports.joinEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    if (event.status === 'completed') {
      return res.status(400).json({ success: false, error: 'Event already completed' });
    }

    // Check if user already joined
    if (event.volunteers.includes(req.user.id)) {
      return res.status(400).json({ success: false, error: 'Already joined this event' });
    }

    event.volunteers.push(req.user.id);
    await event.save();

    // Add points to user (+20)
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { points: 20 }
    });

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark event as completed (and award points to volunteers)
// @route   PUT /api/events/:id/complete
// @access  Private (Host NGO only)
exports.completeEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    // Check if user is the host
    if (event.hostedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this event' });
    }

    if (event.status === 'completed') {
      return res.status(400).json({ success: false, error: 'Event already completed' });
    }

    event.status = 'completed';
    await event.save();

    // Award points to all volunteers (+50)
    await User.updateMany(
      { _id: { $in: event.volunteers } },
      { $inc: { points: 50 } }
    );

    res.status(200).json({
      success: true,
      data: event,
      message: 'Event completed and points awarded to volunteers'
    });
  } catch (err) {
    next(err);
  }
};
