const express = require('express');
const router = express.Router();
const logger = require('../config/winston');
const verifyToken = require('../middleware/verify-token');

module.exports = router;

router.post('/register', require('../controller/auth/register'));
router.post('/login', require('../controller/auth/login'));
router.post('/refresh-token', require('../controller/auth/refesh-token'));
router.put('/:userId/change-password', verifyToken, require('../controller/auth/change-password'));
router.put('/forgot-password', require('../controller/auth/forgot-password'));

//OTP
router.get('/:userId/otp-generator', require('../controller/auth/otp-generate'));
router.post('/otp-verify', require('../controller/auth/otp-verify'));
