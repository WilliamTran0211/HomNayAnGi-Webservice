const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');

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
router.get('/:userId', verifyToken, require('../controller/user/get-user-detail'));
router.put('/:userId', verifyToken, require('../controller/user/update-user-detail'));
