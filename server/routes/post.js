const express = require('express');

const router = express.Router();
const upload = require('../middleware/multer');
const { ensureAuth } = require('../middleware/auth');
const postController = require('../controllers/post');

router.post('/', ensureAuth, upload.single('file'), postController.createPost);
router.get('/', postController.getPost);
router.get('/prompt/:promptId', postController.getPromptPage);

module.exports = router;
