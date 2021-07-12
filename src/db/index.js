const mongoose = require('mongoose');
const { Kinds } = require('../../common');
const Enums = require('./enums');
const { ObjectId } = mongoose.Types;

const { User } = require('./schema');

const db = {};
module.exports = db;

db.User = mongoose.model('users', User);

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

db.load = async () => {
    const url = process.env.DB_URL;
    const name = process.env.DB_NAME;
    const poolSize = process.env.POOL_SIZE ? Kinds.asNumber(process.env.POOL_SIZE) : 2;
    Kinds.mustGreaterThan(poolSize, 0);

    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            dbName,
            poolSize,
            autoIndex: process.env.DB_AUTO_INDEX == true // ignore type comparision
        })
        .then(async () => {
            console.log('connect successful');

            await db.createCollections();
        });
};

db.createCollections = async () => {
    for await (const name of Kinds.objectKeys(db)) {
        if (db.hasOwnProperty(name) && db[name].collection && Kinds.isFunction(db[name].createCollection)) {
            await db[name].createCollection();
        }
    }
};
