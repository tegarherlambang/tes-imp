const { Users } = require('../models/BaseModel');

module.exports.list = async (req, res, next) => {
    try {
        const user = await Users.findAndCountAll({
            limit: req.query.limit,
            offset: req.query.offset,
        })
        return res.status(200).json({
            status: true,
            data: user,
            message: "List of user"
        })
    } catch (error) {
        return next(error)
    }
}