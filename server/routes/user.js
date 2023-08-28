const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/:username', userController.getUserProfile);

module.exports = router;
