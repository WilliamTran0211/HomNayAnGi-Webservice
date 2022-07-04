const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { foodId } = req.params;

    if (!Kinds.isObjectId(foodId)) {
        Res(res).bad('Invalid foodId', { foodId: 1 });
    }

    const food = await services.foodServices.findUserById(foodId);

    if (!food) {
        Res(res).noContent('Not found');
    }

    Res(res).ok('ok', food);
};
