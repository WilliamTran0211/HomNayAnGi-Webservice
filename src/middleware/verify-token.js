const { Res } = require('../../common');
const AccessTokens = require('../util/access-token');

module.exports = async (req, res, next) => {
    const { userId } = req.params;
    const token = req.header('Authorization');

    if (!token) {
        Res(res).unauthorized();
    }

    const tokenDetail = AccessTokens.getTokenDetail(token.replace('Bearer ', ''));

    tokenDetail
        .then((detail) => {
            if (userId && userId === detail.userId) {
                console.log(detail);
                next();
            } else { 
                console.log("UserId in path don't match with token detail.");
                Res(res).forbidden(`Not authorized! UserId in path don't match with token detail.`);
            }
        })
        .catch((err) => {
            console.log(err);
            Res(res).unauthorized();
        });
};
