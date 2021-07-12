const express = require('express');
const router = express.Router();

const logger = require('../config/winston');

module.exports = router;

router.post('/register', require('../controller/auth/register'));
