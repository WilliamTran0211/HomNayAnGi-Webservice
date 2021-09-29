const { Kinds, ResultCodes, Res } = require('../../../common');
module.exports = async (req, res) => {
    console.log('Verify OTP');

    const { services } = req;
    const { code, email, userId } = req.body;

    Kinds.mustExist(code, 'Code must exist', ResultCodes.PARAM_INVALID, { code: 1 });

    let result;

    if (!userId) {
        console.log('No userId');
        Kinds.mustExist(email);
        result = services.secretCodeServices.verifyCodeByEmail(email, code);
    } else {
        console.log('No email');
        Kinds.mustExist(userId);
        Kinds.asObjectId(userId);
        result = services.secretCodeServices.verifyCode(userId, code);
    }

    result
        .then((result) => {
            Res(res).ok({ codeValid: result });
        })
        .catch((err) => {
            console.log(err);
            Res(res).bad({ message: err.message });
        });
};
