const express = require('express');

const router = express.Router();
const promptController = require('../controllers/prompt');

router.post('/', promptController.create);
router.get('/:promptId', promptController.getPrompt);

module.exports = router;
