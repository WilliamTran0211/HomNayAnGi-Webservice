const services = require('../../services');
const { Kinds, Res, ResultCodes } = require('../../../common');

module.exports = async (req, res) => {
    const { userId } = req.params;
    const { email } = req.body;

    if (!Kinds.isString(userId)) {
        Res(res).bad("UserId can't be empty", { email: 0 });
    }

    if (!Kinds.isString(email)) {
        Res(res).bad("Email can't be empty", { email: 0 });
    }

    Res(res).ok();
};
