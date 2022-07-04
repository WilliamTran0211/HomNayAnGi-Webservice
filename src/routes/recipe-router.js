const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');

module.exports = router;

router.get('/', require('../controller/recipe/search'));
router.get('/:recipeId', require('../controller/recipe/get-recipe-detail'));
router.post('/', require('../controller/recipe/create-recipe'));
router.put('/:recipeId');
   
