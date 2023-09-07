const express = require('express');
const userController = require('../controllers/user');
const { ensureAuth } = require('../middleware/auth');
const upload = require('../middleware/multer');

const router = express.Router();

router.get('/:username', userController.getUserProfile);
router.post(
  '/profilepic',
  ensureAuth,
  upload.single('file'),
  userController.updateProfilePic
);
module.exports = router;
