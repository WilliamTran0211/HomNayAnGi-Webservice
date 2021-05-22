const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/hello', (req, res) => {
    res.json('hello in router');
});

router.get('/text', (req, res) => {
    res.json({
        message: 'hello text'
    });
});
