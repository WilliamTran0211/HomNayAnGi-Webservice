const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { email } = req.body;

    if (!Kinds.isString(email)) {
        Res(res).bad("Email can't be empty", { email: 0 });
    }

    await services.userServices
        .sendEmailResetPassword(email)
        .then((result) => {
            Res(res).ok('Email have been sent.');
        })
        .catch((err) => {
            console.log(err);
            Res(res).bad(err.message);
        });
};
