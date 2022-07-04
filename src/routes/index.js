const express = require('express');
const userRouter = require('./user-router');
const authRouter = require('./auth-router');
const foodRouter = require('./food-router');
const recipeRouter = require('./recipe-router');

const router = express();
module.exports = router;

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/food', foodRouter);
router.use('/recipe', recipeRouter);
