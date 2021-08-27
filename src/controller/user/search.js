const { userServices } = require('../../services');
const { Kinds, Res } = require('../../../common');
const ResultCodes = require('../../../common/common-result-codes');

module.exports = async (req, res) => {
    try {
        let { id, name, email } = req.query;
        console.log('search ne');

        Res(res).ok(userServices.search);
    } catch (error) {
        res.status(400);
    }
};
