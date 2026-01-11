const express = require('express');
const { createPost, getPosts, likePost } = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id/like')
  .put(protect, likePost);

module.exports = router;
