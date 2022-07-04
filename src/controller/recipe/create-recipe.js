const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const recipe = req.body;

    try {
        Kinds.mustExist(recipe.title, 'title must exist', ResultCodes.PARAM_INVALID_VALUE);
        Kinds.mustBeArray(recipe.ingredient);

        return services.recipeServices
            .createRecipe(recipe)
            .then(async (result) => {
                await services.recipeServices.saveRecipeIngredients(result._id, recipe.ingredient).then((val) => {
                    Res(res).ok('ok', result);
                });
            })
            .catch((err) => {
                Res(res).bad(err.message);
            });
    } catch (err) {
        console.error(err);
        Res(res).bad(err.message);
    }
};
