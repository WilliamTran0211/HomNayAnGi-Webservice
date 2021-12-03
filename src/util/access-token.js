const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ResultCodes = require('../../common/common-result-codes');

const AccessTokens = function () {};
module.exports = AccessTokens;

//const SECRET_KEY = process.env.JWT_KEY;

const SECRET_ACCESS_KEY = process.env.JWT_ACCESS_KEY;
const SECRET_REFRESH_KEY = process.env.JWT_REFRESH_KEY;

function generateToken(data, SECRET_KEY, expireAfter = 1) {
    return jwt.sign(
        {
            data,
            exp: Math.floor(Date.now() / 1000) + expireAfter // seconds
        },
        SECRET_KEY
    );
}

async function verifyToken(token, SECRET_KEY) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, result) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    const tokenError = new Error();
                    tokenError.code = ResultCodes.TOKEN_EXPIRED;
                    return reject(tokenError);
                }
                if (err instanceof jwt.JsonWebTokenError) {
                    const tokenError = new Error();
                    tokenError.code = ResultCodes.TOKEN_INVALID;
                    return reject(tokenError);
                }
                return reject(err);
            }

            resolve(result);
        });
    });
}

AccessTokens.hash = (x) => {
    return crypto.createHash('sha1').update(x, 'utf8').digest('hex');
};

AccessTokens.generateUserAccessToken = async (userId, password = undefined, tokenExpiredTime = 10800, refreshTokenExpiredTime = 360 * 24 * 60 * 60) => {
    let hash;
    if (password) {
        hash = AccessTokens.hash(password);
    }
    return {
        token: generateToken({ userId, hash }, SECRET_ACCESS_KEY, tokenExpiredTime),
        refreshToken: generateToken({ userId, hash }, SECRET_REFRESH_KEY, refreshTokenExpiredTime)
    };
};

AccessTokens.getTokenDetail = async (token) => {
    return verifyToken(token, SECRET_ACCESS_KEY).then((value) => {
        return value.data;
    });
};

AccessTokens.getRefreshTokenDetail = async (token) => {
    return verifyToken(token, SECRET_REFRESH_KEY).then((value) => {
        return value.data;
    });
};

AccessTokens.exportTokenInfo = async (token) => {
    return jwt.decode(token, { complete: true });
};
