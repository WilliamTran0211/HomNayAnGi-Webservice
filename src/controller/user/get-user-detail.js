const { Kinds, Res } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { userId } = req.params;

    if (!Kinds.isObjectId(userId)) {
        return Res(res).bad('Invalid userId', { userId: 1 });
    }

    const user = await services.userServices.findUserById(userId);

    if (!user) {
        return Res(res).noContent('Not found');
    }

    const userDetail = user.toObject();
    delete userDetail.password;

    Res(res).ok('ok', userDetail);
};
