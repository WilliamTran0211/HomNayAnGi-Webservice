const mongoose = require('mongoose');
const { Kinds } = require('../../common');
const Enums = require('./enums');
const { ObjectId } = mongoose.Types;

const { User, Recipe, DishType, SecretCode, Food } = require('./schema');

const db = {};
module.exports = db;

db.User = mongoose.model('User', User);
db.Recipe = mongoose.model('Recipe', Recipe);
db.DishType = mongoose.model('DishType', DishType);
db.SecretCode = mongoose.model('SecretCode', SecretCode);
db.Enums = Enums;

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);

db.load = async () => {
    const url = process.env.DB_URL;
    const dbName = process.env.DB_NAME;
    const poolSize = process.env.POOL_SIZE ? Kinds.asNumber(process.env.POOL_SIZE) : 2;
    Kinds.mustGreaterThan(poolSize, 0);

    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName,
            poolSize,
            autoIndex: process.env.DB_AUTO_INDEX === 'true' // ignore type comparision
        })
        .then(async () => {
            console.log('connect database successful');

            await db.createCollections();

            return db;
        });
};

db.createCollections = async () => {
    for await (const name of Kinds.objectKeys(db)) {
        if (db.hasOwnProperty(name) && db[name].collection && Kinds.isFunction(db[name].createCollection)) {
            await db[name].createCollection();
        }
    }
};
