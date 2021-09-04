const { Kinds, ResultCodes, ErrorCodes } = require('../../common');
const { ObjectId } = require('mongoose').Types;
const speakeasy = require('speakeasy');

const { SecretCode } = require('../db');

const SecrectCodeServices = function (app) {
    console.log('Create SecrectCode Services');
    this.app = app;
};

module.exports = SecrectCodeServices;

async function generateSecretKey(userId, timeToLive = null) {
    //Create a new SecrectCode in Database
    const uniqueId = new ObjectId();

    const secretKey = speakeasy.generateSecret({
        length: 33
    });

    const secretCode = new SecretCode({
        userId: userId,
        uniqueId: uniqueId,
        secretKey: secretKey.base32
    });

    let saveSecretCode;
    try {
        saveSecretCode = await secretCode.save();
    } catch (err) {
        throw ResultCodes.newError(err.message);
    }

    return saveSecretCode;
}

SecrectCodeServices.prototype.getSecrectKey = async function (userId) {
    const user = await this.app.services.userServices.getUserById(userId);

    if (!user) {
        return Promise.reject(ResultCodes.newError('User is not found.', ResultCodes.NOT_FOUND));
    }

    const secrectKey = await SecretCode.findOne({ userId: user._id });

    return secrectKey;
};

SecrectCodeServices.prototype.generateCode = async function (userId) {
    //Get secret key from database
    //If there is no secret code in database then call generateSecretKey to generate new one
    //after that return new TOTP

    let secret = await this.getSecrectKey(userId);

    if (!secret) {
        secret = await generateSecretKey(userId);
    }

    const code = speakeasy.totp({
        secret: secret.secretKey,
        encoding: 'base32',
        step: 180
    });

    return {
        code: code,
        time: 30 - Math.floor((new Date().getTime() / 1000) % 30)
    };
};

SecrectCodeServices.prototype.verifyCode = async function (userId, code) {
    //return true if TOTP is verified

    const secret = await this.getSecrectKey(userId);

    if (!secret) {
        return Promise.reject(ResultCodes.newError('Sercet code is not found.', ResultCodes.NOT_FOUND));
    }

    return speakeasy.totp.verify({
        secret: secret.secretKey,
        encoding: 'base32',
        token: code,
        step: 180
    });
};
