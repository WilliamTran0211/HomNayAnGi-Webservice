const { Res } = require('../../common');
const AccessTokens = require('../util/access-token');

module.exports = async (req, res, next) => {
    const { userId } = req.params;
    const token = req.header('Authorization');

    if (!token) {
        return Res(res).unauthorized();
    }

    try {
        const detail = await AccessTokens.getTokenDetail(token.replace('Bearer ', ''));

        if (userId && userId !== detail.userId) {
            return Res(res).forbidden(`Not authorized! UserId in path don't match with token detail.`);
        }

        req.tokenDetail = detail;
        next();
    } catch (err) {
        console.log(err);
        Res(res).unauthorized();
    }
};
