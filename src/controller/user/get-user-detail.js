const { Kinds, Res } = require('../../../common');
const { userServices } = require('../../services');

module.exports = async (req, res) => {
    let { userId } = req.params;

    if (!Kinds.isObjectId(userId)) {
        Res(res).badParam('Invalid userId', { userId: 1 });
    }

    const user = await userServices.findUserById(userId);

    if (!user) {
        Res(res).noContent('Not found');
    }

    const userDetail = user.toObject();
    delete userDetail.password;

    Res(res).ok('ok', userDetail);
};
