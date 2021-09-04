const { Kinds, ResultCodes } = require('../../common');
const { ObjectId } = require('mongoose').Types;
const bcrypt = require('bcrypt');
const AccessTokens = require('../util/access-token');

const { User, Enums } = require('../db');

const UserServices = function (app) {
    console.log('Create User Service');
    this.app = app;
};

module.exports = UserServices;

UserServices.prototype.search = async function () {
    let userList = await User.find({});
    return userList;
};

UserServices.prototype.getUserList = async function () {
    let userList = await User.find({});
};

UserServices.prototype.findUserById = async function (stringOrObjectId, select = null, options = null) {
    return User.findById(Kinds.asObjectId(stringOrObjectId), select, options);
};

UserServices.prototype.findUserByIds = async function (userIds) {
    return User.find({ _id: { $in: Kinds.asObjectIds(userIds) } });
};

UserServices.prototype.getUserById = async function (stringOrObjectId) {
    const user = await User.findById(Kinds.asObjectId(stringOrObjectId));
    Kinds.mustExist(user, `No such userId ${stringOrObjectId}`, ResultCodes.NO_CONTENT, { userId: 1 });
    return user;
};

UserServices.prototype.findUserByEmail = async function (email) {
    return User.findOne({ email });
};

UserServices.prototype.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        return Promise.resolve(null);
    }

    return bcrypt.compare(password, user.password).then((result) => {
        if (result) {
            return Promise.resolve(user);
        }
        return Promise.resolve(null);
    });
};

UserServices.prototype.getUserLoginResult = async function (userId) {
    console.log(this);
    const userDetail = (await this.getUserById(userId)).toObject();

    console.log(userDetail);

    const { token, refreshToken } = await AccessTokens.generateUserAccessToken(userDetail._id, userDetail.password);

    delete userDetail.password;

    if (userDetail.status !== Enums.UserStatuses.ACTIVE) {
        return Promise.reject(ErrorCodes.newError('User is not active.', ErrorCodes.INVALID_STATE));
    }

    return { ...userDetail, token, refreshToken };
};

UserServices.prototype.createUser = async function (validateUserData) {
    let newUserID = new ObjectId();

    const user = new User({ ...validateUserData, _id: newUserID });

    user.password = await bcrypt.hash(user.password, 5);

    if (user.birthday) {
        user.birthday = Kinds.asDate(user.birthday);
    }

    user.displayName = user.displayName || user.firstName;

    user.gender = user.gender || Enums.Genders.UNKNOWN;
    user.role = user.role || Enums.UserRoles.USER;
    user.status = Enums.UserStatuses.ACTIVE;

    let savedUser;
    try {
        savedUser = await user.save();
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw ResultCodes.newError(error.message, ResultCodes.PARAM_INVALID_VALUE, error.errors);
        }
        if (error.code === 11000) {
            // dup key.
            throw ResultCodes.newError(`User exists, ${user.email}`, ResultCodes.DUPLICATED);
        }
        throw error;
    }

    return savedUser;
};

UserServices.prototype.updateUser = async function (userId, values) {
    let user = await this.getUserById(userId);

    User.schema.eachPath((path) => {
        if (values[path] !== null && values[path] !== undefined && !['_id', 'email', 'password', 'status', '__v'].includes(path)) {
            user[path] = values[path];
        }
    });

    return user.save();
};

UserServices.prototype.changePassword = async function (userId, password, newPassword) {
    let user = await this.getUserById(userId);
    let success = await this.findUserByCredentials(user.email, password);

    if (!success) {
        throw ResultCodes.newError('Invalid Password', ResultCodes.PARAM_INVALID_VALUE, { password: 1 });
    }

    user.password = await bcrypt.hash(newPassword, 5);
    user.save();

    return this.getUserLoginResult(userId);
};

UserServices.prototype.deleteUser = async function (userId, password) {
    let user = await this.getUserById(userId);
    let success = await this.findUserByCredentials(user.email, password);

    if (!success) {
        throw ResultCodes.newError('Invalid Password', ResultCodes.PARAM_INVALID_VALUE, { password: 1 });
    }

    user.remove();
    return user;
};

UserServices.prototype.sendEmailVerificationLink = async function (userId) {};

UserServices.prototype.sendEmailActivation = async function (email) {};

UserServices.prototype.verifyEmailByCode = async function (code) {};

UserServices.prototype.sendEmailAndResetPasswordForUser = async function (userId) {};

UserServices.prototype.sendEmailResetPassword = async function (userId) {};
