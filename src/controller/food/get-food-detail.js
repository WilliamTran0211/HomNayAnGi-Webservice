const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { foodId } = req.params;

    if (!Kinds.isObjectId(foodId)) {
        return Res(res).bad('Invalid foodId', { foodId: 1 });
    }

    const food = await services.foodServices.getFoodById(foodId);

    if (!food) {
        return Res(res).noContent('Not found');
    }

    Res(res).ok('ok', food);
};
