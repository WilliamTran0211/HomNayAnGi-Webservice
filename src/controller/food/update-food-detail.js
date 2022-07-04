const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { foodID } = req.params;
    const foodDetails = req.body;

    if (!Kinds.isObjectId(foodID)) {
        Res(res).bad('Invalid foodID', { foodID: 1 });
    }

    let oldFoodData = await services.foodServices.getFoodById(foodID);

    if (!oldFoodData) {
        Res(res).noContent('Not found');
    }

    return await services.foodServices
        .updateFood(foodID, foodDetails)
        .then((food) => {
            Res(res).ok('Food info update successful', food);
        })
        .catch((error) => {
            console.error(error);
            res.status(404).send({
                code: 'error',
                message: error.message
            });
        });
};
