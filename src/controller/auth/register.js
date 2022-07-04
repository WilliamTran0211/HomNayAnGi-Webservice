const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const user = req.body;
    try {
        Kinds.mustExist(user.email, 'email', ResultCodes.PARAM_INVALID_VALUE, { email: 1 });
        Kinds.mustExist(user.password, 'password', ResultCodes.PARAM_INVALID_VALUE, { password: 1 });

        return services.userServices
            .createUser(user)
            .then((user) => {
                const createdUser = user.toObject();

                delete createdUser.password;

                Res(res).ok('welcome', createdUser);
            })
            .catch((error) => {
                res.status(404).send({
                    code: 'error',
                    message: error.message
                });
            });
    } catch (err) {
        console.error(err);
        Res(res).bad(err.message + ' must exist.');
    }

    //Res(res).ok('ok', user);
    // res.status(200).send({
    //     code: 'success',
    //     message: 'OK',
    //     results: user
    // });
};
