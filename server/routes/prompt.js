const express = require('express');

const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const promptController = require('../controllers/prompt');

router.post('/', ensureAuth, promptController.create);
router.get('/home', promptController.getHomePrompts);
router.get('/user/:username', promptController.getUserPrompts);
router.get('/:promptId', promptController.getPrompt);

module.exports = router;
