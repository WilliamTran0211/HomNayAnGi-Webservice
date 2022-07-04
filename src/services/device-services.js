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

DeviceService.prototype.setUserDevice = async function () {};

DeviceService.prototype.getUserDevice = async function () {};
