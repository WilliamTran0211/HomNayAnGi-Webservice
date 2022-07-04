const { Kinds, ResultCodes } = require('../../common');
const { ObjectId } = require('mongoose').Types;
const { Recipe, RecipeIngredient, Enums } = require('../db');

const RecipeService = function (app) {
    console.log('Create Recipe Service');
    this.app = app;
};

module.exports = RecipeService;

RecipeService.prototype.search = async function () {
    let recipeList = await Recipe.find({});
    return recipeList;
};

RecipeService.prototype.getRecipeById = async function (stringOrObjectId, select = null, options = null) {
    return Recipe.findById(Kinds.asObjectId(stringOrObjectId), select, options);
};

RecipeService.prototype.getRecipeDetailsById = async function (recipeId) {
    let res = await Recipe.aggregate([
        { $match: { _id: Kinds.asObjectId(recipeId) } },
        { $lookup: { from: 'RecipeIngredient', localField: '_id', foreignField: 'recipe', as: 'ingredients' } },
        { $unwind: '$ingredients' },
        { $lookup: { from: 'Food', localField: 'ingredients.ingredient', foreignField: '_id', as: 'ingredients.ingredient' } },
        { $unwind: '$ingredients.ingredient' },
        {
            $group: {
                _id: '$_id',
                serves: { $first: '$serves' },
                cookin: { $first: '$cookIn' },
                title: { $first: '$title' },
                description: { $first: '$description' },
                type: { $first: '$type' },
                ingredients: { $push: '$ingredients' }
            }
        }
    ]);

    console.log(res);

    return res;
};

RecipeService.prototype.createRecipe = async function (validateRecipeDetails) {
    let newRecipeID = new ObjectId();

    const recipe = new Recipe({ ...validateRecipeDetails, _id: newRecipeID });

    recipe.type = recipe.type || Enums.RecipeTypes.MAIN_COURSE;

    let saveRecipe;
    try {
        saveRecipe = await recipe.save();
    } catch (err) {
        if (error.name === 'ValidationError') {
            throw ResultCodes.newError(error.message, ResultCodes.PARAM_INVALID_VALUE, error.errors);
        }
        throw error;
    }
    return saveRecipe;
};

RecipeService.prototype.updateRecipe = async function () {};

RecipeService.prototype.deleteRecipe = async function () {};

// Recipe Ingredients
RecipeService.prototype.getIngredientsOfRecipe = async function (recipeId) {
    const ingredientIds = await RecipeIngredient({ recipe: Kinds.asObjectId(recipeId) }, { ingredient: 1 });

    const listFood = await this.app.FoodServices.getFoodsByIds(ingredientIds);

    return listFood;
};
RecipeService.prototype.saveRecipeIngredients = async function (recipeId, ingredients) {
    const recipe = await this.getRecipeById(recipeId);

    if (!recipe) {
        return Promise.reject(ResultCodes.newError('Recipe not found', ResultCodes.NOT_FOUND));
    }

    console.log(ingredients);

    if (ingredients.length > 0) {
        let saveIngredient;
        try {
            for (index in ingredients) {
                saveIngredient = new RecipeIngredient({
                    recipe: Kinds.asObjectId(recipeId),
                    ingredient: Kinds.asObjectId(ingredients[index]._id),
                    amount: ingredients[index].amount,
                    unit: ingredients[index].unit
                });
                saveIngredient.save();
            }
            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(err);
        }
    }
};
