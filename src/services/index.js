const UserServices = require('./user-services');
const EmailServices = require('./email-services');
const SecretCodeServices = require('./secret-code-services');
const RecipeService = require('./recipe-services');
const FoodServices = require('./food-services');

function load() {
    console.log('Here create services');
    return {
        emailServices: new EmailServices(),
        userServices: new UserServices(),
        recipeService: new RecipeService(),
        foodServices: new FoodServices(),
        secretCodeServices: new SecretCodeServices()
    };
}

module.exports = load();
