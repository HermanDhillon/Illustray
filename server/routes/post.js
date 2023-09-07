const express = require('express');

const router = express.Router();
const upload = require('../middleware/multer');
const { ensureAuth } = require('../middleware/auth');
const postController = require('../controllers/post');

router.post(
  '/:promptId',
  ensureAuth,
  upload.single('file'),
  postController.createPost
);
router.get('/', postController.getPost);
router.get('/prompt/:promptId', postController.getPromptPosts);
router.get('/home', postController.getHomePosts);
router.get('/user/:username', postController.getUserPosts);

module.exports = router;
