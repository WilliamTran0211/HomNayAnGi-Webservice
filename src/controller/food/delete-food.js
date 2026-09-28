const { Kinds, Res } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { foodID } = req.params;

    if (!Kinds.isObjectId(foodID)) {
        return Res(res).bad('Invalid foodID', { foodID: 1 });
    }

    return services.foodServices
        .deleteFood(foodID)
        .then((food) => {
            Res(res).ok('Food deleted', food);
        })
        .catch((err) => {
            Res(res).bad(err.message);
        });
};
