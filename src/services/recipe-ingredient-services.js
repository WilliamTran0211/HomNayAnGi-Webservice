const { Kinds, ResultCodes } = require('../../common');
const { ObjectId } = require('mongoose').Types;
const { Recipe, Food, RecipeIngredient, Enums } = require('../db');

const RecipeIngredientService = function (app) {
    console.log('Create Recipe Service');
    this.app = app;
};

module.exports = RecipeIngredientService;

RecipeIngredientService.getIngredientsOfRecipe = async function (recipeId) {
    const ingredientIds = await RecipeIngredient({ recipe: Kinds.asObjectId(recipeId) }, { ingredient: 1 });

    const listFood = await this.app.FoodServices.getFoodsByIds(ingredientIds);

    return listFood;
};

RecipeIngredientService.saveIngredient = async function (recipeId, ingredientId){
    const recipe = await this.app.RecipeService.getRecipeById(recipeId);
}