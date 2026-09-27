const { Kinds, ResultCodes } = require('../../common');
const { ObjectId } = require('mongoose').Types;
const { Recipe, Food, RecipeIngredient, Enums } = require('../db');

const RecipeIngredientService = function (app) {
    console.log('Create Recipe Service');
    this.app = app;
};

module.exports = RecipeIngredientService;

RecipeIngredientService.prototype.getIngredientsOfRecipe = async function (recipeId) {
    const ingredientIds = await RecipeIngredient.find({ recipe: Kinds.asObjectId(recipeId) }, { ingredient: 1 });

    const listFood = await this.app.services.foodServices.getFoodsByIds(ingredientIds);

    return listFood;
};

RecipeIngredientService.prototype.saveIngredient = async function (recipeId, ingredientId) {
    const recipe = await this.app.services.recipeServices.getRecipeById(recipeId);

    return recipe;
};