const { Kinds, Res } = require('../../../common');

module.exports = async (req, res) => {
    console.log('Generate OTP');

    const { services } = req;
    const { userId } = req.params;

    if (!Kinds.isObjectId(userId)) {
        return Res(res).bad('Invalid userId', { userId: 1 });
    }

    services.secretCodeServices
        .generateCode(userId)
        .then((result) => {
            Res(res).ok('ok', {
                code: result.code,
                remainTime: result.time
            });
        })
        .catch((err) => {
            Res(res).bad(err.message);
        });
};
