const UserServices = require('./user-services');
const EmailServices = require('./email-services');
const SecretCodeServices = require('./secret-code-services');
const RecipeService = require('./recipe-services');
const FoodServices = require('./food-services');

const service = function (app) {
    console.log('Here create services');
    return {
        emailServices: new EmailServices(app),
        userServices: new UserServices(app),
        recipeService: new RecipeService(app),
        foodServices: new FoodServices(app),
        secretCodeServices: new SecretCodeServices(app)
    };
};

module.exports = service;
