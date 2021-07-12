const { userServices } = require('../../services');

module.exports = async (req, res) => {
    try {
        let { id } = req.params;
        let userDetail = userServices.getUserDetail(id);
        res.status(200).json({
            user: userDetail
        });
    } catch (error) {
        res.status(400);
    }
};
