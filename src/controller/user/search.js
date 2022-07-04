const { Kinds, Res } = require('../../../common');
const ResultCodes = require('../../../common/common-result-codes');

module.exports = async (req, res) => {
    const { services } = req;
    try {
        let { id, name, email } = req.query;
        console.log('search ne');

        let userList = await services.userServices.search();
        Res(res).ok('ok', userList);
    } catch (error) {
        Res(res).bad(error.message);
    }
};
