const express = require('express');
const { createEvent, getEvents, joinEvent, completeEvent } = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, authorize('ngo', 'admin'), createEvent);

router.route('/:id/join')
  .put(protect, joinEvent);

router.route('/:id/complete')
  .put(protect, authorize('ngo', 'admin'), completeEvent);

module.exports = router;
