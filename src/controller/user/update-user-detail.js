const { Kinds, Res } = require('../../../common');

module.exports = async (req, res) => {
    const { services } = req;
    const { userId } = req.params;
    const userDetails = req.body;

    if (!Kinds.isObjectId(userId)) {
        Res(res).bad('Invalid userId', { userId: 1 });
    }

    const user = await services.userServices.findUserById(userId);

    if (!user) {
        Res(res).noContent('Not found');
    }

    return await services.userServices
        .updateUser(userId, userDetails)
        .then((user) => {
            let obj = user.toObject();
            delete obj.password;
            Res(res).ok('User info update successful', obj);
        })
        .catch((error) => {
            res.status(404).send({
                code: 'error',
                message: error.message
            });
        });
};
