const { Kinds } = require('../../common');
const { User, SecrectCode } = require('../db');

const SecrectCodeServices = function () {};

module.exports = SecrectCodeServices;

SecrectCodeServices.prototype.generate6Digits = async function () {};

SecrectCodeServices.prototype.verifyCode = async function () {};
