const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');

module.exports = router;

router.get('/', require('../controller/food/search'));
router.get('/:foodID', require('../controller/food/get-food-detail'));
router.post('/', require('../controller/food/create-food'));
router.put('/:foodID', require('../controller/food/update-food-detail'));
