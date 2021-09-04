const { Kinds, Res } = require('../../../common');
const ResultCodes = require('../../../common/common-result-codes');
const Enums = require('../../db/enums');

module.exports = async (req, res) => {
    const { services } = req;
    const { email, password } = req.body;

    if (!Kinds.isString(email) || !Kinds.isString(password)) {
        Res(res).bad("Email and Password can't be empty", { email: 0, password: 0 });
    }

    //return userdetail if found
    let user = await services.userServices.findUserByCredentials(email, password);

    if (!user) {
        Res(res).bad('Invalid email or password!');
    }

    if (user.status !== Enums.UserStatuses.ACTIVE) {
        Res(res).invalidState('User is not active!', { _id: user._id });
    }
    const userDetail = await services.userServices.getUserLoginResult(user._id);

    Res(res).ok('Hi there!', userDetail);
};
