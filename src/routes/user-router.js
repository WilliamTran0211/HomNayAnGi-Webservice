const express = require('express');
const router = express.Router();
const { userController } = require('../controller');

module.exports = router;

router.get('/hello', (req, res) => {
    res.json('hello in router');
});

router.get('/text', (req, res) => {
    res.json({
        message: 'hello text'
    });
});

router.get('/', require('../controller/user/search'));
