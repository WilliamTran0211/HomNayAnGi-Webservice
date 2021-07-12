const { userServices } = require('../../services');

module.exports = async (req, res) => {
    try {
        let { id, name, email } = req.query;
        console.log('search ne');
        console.log(req);

        return res.json(req);
    } catch (error) {
        res.status(400);
    }
};
