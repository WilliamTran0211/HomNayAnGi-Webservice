const { Kinds, Res } = require('../../../common');
const ResultCodes = require('../../../common/common-result-codes');

module.exports = async (req, res) => {
    const { services } = req;
    try {
        let { id, name } = req.query;
        console.log('search ne');

        let recipeList = await services.recipeServices.search();
        Res(res).ok('ok', recipeList);
    } catch (error) {
        Res(res).bad(error.message);
    }
};
