const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const food = req.body;
    try {
        Kinds.mustExist(food.name, 'name', ResultCodes.PARAM_INVALID_VALUE);
        console.log(food);
        food.nutrition.calories = Kinds.asNumber(food.nutrition.calories);
        food.nutrition.protein = Kinds.asNumber(food.nutrition.protein);
        food.nutrition.carbs = Kinds.asNumber(food.nutrition.carbs);
        food.nutrition.fat = Kinds.asNumber(food.nutrition.fat);

        return services.foodServices
            .createFood(food)
            .then((food) => {
                const newFood = Object.create(food);

                Res(res).ok('ok', newFood);
            })
            .catch((err) => {
                Res(res).bad(err.message);
            });
    } catch (error) {
        console.error(error);
        Res(res).bad(error.message + ' must exist.');
    }
};
