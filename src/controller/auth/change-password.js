const { Res, Kinds } = require('../../../common');
const { userServices } = require('../../services');

module.exports = async (req, res) => {
    const { userId } = req.params;
    const { password, newPassword } = req.body;

    if (!Kinds.isObjectId(userId)) {
        Res(res).bad('Invalid userId', { userId: 1 });
    }

    if (!Kinds.isString(newPassword) || !Kinds.isString(password)) {
        Res(res).bad('Password or newPassword are invalid.', { password: 1, newPassword: 1 });
    }

    userServices
        .changePassword(userId, password, newPassword)
        .then((result) => {
            Res(res).ok(result);
        })
        .catch((err) => {
            Res(res).forbidden(err);
        });
};
