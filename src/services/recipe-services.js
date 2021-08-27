const { Kinds } = require('../../common');
const { Recipe } = require('../db');

const RecipeService = function () {};

module.exports = RecipeService;

RecipeService.prototype.search = async function () {};

RecipeService.prototype.getRecipeById = async function (stringOrObjectId) {};

RecipeService.prototype.getRecipesByUserId = async function () {};

RecipeService.prototype.getRecipesByFoodIds = async function () {};

RecipeService.prototype.createRecipe = async function () {};

RecipeService.prototype.updateRecipe = async function () {};

RecipeService.prototype.deleteRecipe = async function () {};

RecipeService.prototype.ratingRecipe = async function () {};
