const { Kinds, Res } = require('../../../common');
const ResultCodes = require('../../../common/common-result-codes');

module.exports = async (req, res) => {
    const { services } = req;
    try {
        let { recipeId } = req.params;
        console.log('search ne id:', recipeId);

        let recipeList = await services.recipeServices.getRecipeDetailsById(recipeId);
        Res(res).ok('ok', recipeList);
    } catch (error) {
        Res(res).bad(error.message);
    }
};
