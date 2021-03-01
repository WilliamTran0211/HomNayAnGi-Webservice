const mongoose = require('mongoose');
const { Kinds } = require('../../common');
const Enums = require('./enums');
const { ObjectId } = mongoose.Types;

const {
    User
} = require('./schema')


const db = {};
module.exports = db;

db.User = mongoose.model('users', User);


mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);



