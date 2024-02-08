const express = require('express');
const webhookHandler = require('../controllers/controller.js');

const router = express.Router();

router.post('/webhook', webhookHandler);

module.exports = router;
