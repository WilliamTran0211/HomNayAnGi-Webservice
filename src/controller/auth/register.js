const { userServices } = require('../../services');
const { Kinds, Res } = require('../../../common');
const ResultCodes = require('../../../common/common-result-codes');

module.exports = async (req, res) => {
    let user = req.body;

    Kinds.mustExist(user.email, 'email', ResultCodes.PARAM_INVALID_VALUE, { email: 1 });
    Kinds.mustExist(user.password, 'password', ResultCodes.PARAM_INVALID_VALUE, { password: 1 });

    return userServices
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

    //Res(res).ok('ok', user);
    // res.status(200).send({
    //     code: 'success',
    //     message: 'OK',
    //     results: user
    // });
};
