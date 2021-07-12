const { User } = require('../db');

const userServices = {};

module.exports = userServices;

userServices.search = async () => {
    let userList = await User.find({});
    return userList;
};

userServices.getUserDetail = async (id) => {
    let user = await User.findById({ id });
    return user;
};
