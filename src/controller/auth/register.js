const { userServices } = require('../../services');

module.exports = async (req, res) => {
    try {
        let userInfo = req.body;
        console.log(userInfo);
    } catch (error) {
        return res.status(400);
    }
};
