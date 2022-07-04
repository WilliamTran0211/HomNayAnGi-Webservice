const UserServices = require('./user-services');
const EmailServices = require('./email-services');
const SecretCodeServices = require('./secret-code-services');
const RecipeServices = require('./recipe-services');
const FoodServices = require('./food-services');
const DeviceServices = require('./device-services');
const RecipeIngredientServices = require('./recipe-ingredient-services');

const service = function (app) {
    console.log('Here create services');
    return {
        emailServices: new EmailServices(app),
        userServices: new UserServices(app),
        recipeServices: new RecipeServices(app),
        foodServices: new FoodServices(app),
        secretCodeServices: new SecretCodeServices(app),
        deviceServices: new DeviceServices(app),
        recipeIngredient: new RecipeIngredientServices(app)
    };
};

module.exports = service;
