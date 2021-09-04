const { Kinds, Res } = require('../../../common');
module.exports = async (req, res) => {
    console.log('Verify OTP');

    const { services } = req;
    const { userId } = req.params;
    const { code } = req.body;

    Kinds.mustExist(code);

    const result = services.secretCodeServices.verifyCode(userId, code);

    result
        .then((result) => {
            Res(res).ok({ codeValid: result });
        })
        .catch((err) => {
            console.log(err);
            Res(res).bad({ message: err.message });
        });
};
