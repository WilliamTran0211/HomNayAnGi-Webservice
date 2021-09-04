const { Kinds, Res } = require('../../../common');

module.exports = async (req, res) => {
    console.log('Generate OTP');

    const { services } = req;
    const { userId } = req.params;

    const result = services.secretCodeServices.generateCode(userId);

    if (!Kinds.isObjectId(userId)) {
        Res(res).bad('Invalid userId', { userId: 1 });
    }

    result
        .then((result) => {
            Res(res).ok({
                code: result.code,
                remainTime: result.time
            });
        })
        .catch((err) => {
            Res(res).bad(err.message);
        });
};
