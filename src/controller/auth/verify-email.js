const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { userId, code } = req.body;

    if (!Kinds.isObjectId(userId)) {
        return Res(res).bad('Invalid userId', { userId: 1 });
    }

    if (!Kinds.isString(code)) {
        return Res(res).bad('Code must exist', { code: 1 });
    }

    return services.userServices
        .verifyEmailByCode(userId, code)
        .then(() => {
            Res(res).ok('Email verified', { emailVerified: true });
        })
        .catch((err) => {
            Res(res).bad(err.message);
        });
};
