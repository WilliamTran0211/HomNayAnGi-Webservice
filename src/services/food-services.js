const { Kinds, ResultCodes } = require('../../common');
const { ObjectId } = require('mongoose').Types;
const { Food, Enums } = require('../db');
const FoodServices = function (app) {
    console.log('Create Food Service');
    this.app = app;
};

module.exports = FoodServices;

FoodServices.prototype.search = async function () {
    let foodList = await Food.find({});
    console.log('Food:', foodList);
    return foodList;
};

FoodServices.prototype.getFoodById = async function (stringOrObjectId, select = null, options = null) {
    console.log('getFoodById');
    return Food.findById(Kinds.asObjectId(stringOrObjectId), select, options);
};

FoodServices.prototype.getFoodsByIds = async function (foodIds, select = null, options = null) {
    return Food.find({ _id: { $in: Kinds.asObjectIds(foodIds) } }, select, options);
};

FoodServices.prototype.createFood = async function (validateFoodData) {
    let newFoodId = new ObjectId();

    const newFoodData = new Food({ ...validateFoodData, _id: newFoodId });

    let saveData;
    try {
        saveData = await newFoodData.save();
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw ResultCodes.newError(err.message, ResultCodes.PARAM_INVALID_VALUE, err.errors);
        }
        throw err;
    }
    return saveData;
};

FoodServices.prototype.updateFood = async function (foodId, values) {
    let food = await this.getFoodById(foodId);

    food.name = values.name || food.name;
    food.nutrition.calories = values.nutrition.calories || food.nutrition.calories;
    food.nutrition.protein = values.nutrition.protein || food.nutrition.protein;
    food.nutrition.fat = values.nutrition.fat || food.nutrition.fat;
    food.nutrition.carbs = values.nutrition.carbs || food.nutrition.carbs;

    return food.save();
};

FoodServices.prototype.deleteFood = async function (foodId) {
    const food = await this.getFoodById(foodId);

    Kinds.mustExist(food, `No such foodId ${foodId}`, ResultCodes.NOT_FOUND, { foodId: 1 });

    await food.remove();

    return food;
};
