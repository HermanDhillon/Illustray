const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignUp);

module.exports = router;
