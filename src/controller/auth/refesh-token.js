const { Kinds, Res, ResultCodes } = require('../../../common');
const { userServices } = require('../../services');
const AccessTokens = require('../../util/access-token');
const Enums = require('../../db/enums');

module.exports = async (req, res) => {
    const { email, password, refreshToken } = req.body;

    const oldRefreshToken = refreshToken;

    return Promise.resolve()
        .then(() => {
            if (refreshToken) {
                return AccessTokens.getTokenDetail(refreshToken).then(async (details) => {
                    console.log(details);
                    const userId = details.userId;

                    if (userId) {
                        const user = await userServices.findUserById(userId, '_id password status');

                        if (user) {
                            if (user.status !== Enums.UserStatuses.ACTIVE) {
                                console.log(`user is not active => invalid token`);
                                return Promise.reject(new Error('`user is not active'));
                            }

                            if (details.hash !== AccessTokens.hash(user.password)) {
                                console.log(`password has been changed.`);
                                return Promise.reject(new Error('`password has been changed'));
                            }
                            return user;
                        }
                    }
                });
            }
            Kinds.mustExist(email);
            Kinds.mustExist(password);
            return userServices.findUserByCredentials(email, password);
        })
        .then(async (user) => {
            Kinds.mustExist(user, 'invalid authentication values', ResultCodes.PARAM_INVALID_VALUE);

            const { token } = await AccessTokens.generateUserAccessToken(user._id, user.password);

            Res(res).ok({ accessToken: token, refreshToken: oldRefreshToken });
        })
        .catch((err) => {
            console.log('errrrrrrrrr: ', err.message);
            Res(res).forbidden();
        });
};
