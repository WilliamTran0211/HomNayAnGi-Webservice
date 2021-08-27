const express = require('express');
const router = express.Router();
const logger = require('../config/winston');

module.exports = router;

router.post('/register', require('../controller/auth/register'));
router.post('/login', require('../controller/auth/login'));
router.post('/refresh-token', require('../controller/auth/refesh-token'));
router.put('/change-password', require('../controller/auth/change-password'));
