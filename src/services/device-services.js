const { Kinds, ResultCodes } = require('../../common');
const { ObjectId } = require('mongoose').Types;
const bcrypt = require('bcrypt');
const AccessTokens = require('../util/access-token');

const { User, UserDevice, Enums } = require('../db');

const DeviceService = function (app) {
    console.log('Create User Device Service');
    this.app = app;
};

module.exports = DeviceService;

DeviceService.prototype.setUserDevice = async function (userId, deviceId, token) {
    Kinds.mustExist(userId, 'userId', ResultCodes.PARAM_INVALID_VALUE, { userId: 1 });
    Kinds.mustExist(deviceId, 'deviceId', ResultCodes.PARAM_INVALID_VALUE, { deviceId: 1 });

    return UserDevice.findOneAndUpdate(
        { user: Kinds.asObjectId(userId), deviceId },
        { user: Kinds.asObjectId(userId), deviceId, token },
        { upsert: true, new: true }
    );
};

DeviceService.prototype.getUserDevice = async function (userId) {
    return UserDevice.find({ user: Kinds.asObjectId(userId) });
};
