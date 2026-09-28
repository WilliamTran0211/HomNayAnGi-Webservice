const { Kinds, Res } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { recipeId } = req.params;

    if (!Kinds.isObjectId(recipeId)) {
        return Res(res).bad('Invalid recipeId', { recipeId: 1 });
    }

    return services.recipeServices
        .deleteRecipe(recipeId)
        .then((recipe) => {
            Res(res).ok('Recipe deleted', recipe);
        })
        .catch((err) => {
            Res(res).bad(err.message);
        });
};
