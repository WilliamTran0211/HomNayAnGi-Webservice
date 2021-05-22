const express = require('express');
const userRouter = require('./user-router');
const authRouter = require('./auth-router');

const router = express();
module.exports = router;

router.use('/user', userRouter);
router.use('/auth', authRouter);
