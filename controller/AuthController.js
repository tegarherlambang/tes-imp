const { Users } = require('../models/BaseModel');
const hashPassword = require('../service/hashPassword')
const bcrypt = require('bcrypt')
const tokenService = require('../middlewares/token')

const { body } = require('express-validator/check')
module.exports.signup = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        })
        if (user) return res.status(409).json({ status: false, data: [], message: "User already exist" })
        await Users.create({
            username: req.body.username,
            password: await hashPassword.hash(req.body.password),
        })
        const token = await tokenService.createToken({ username: req.body.username })
        return res.status(200).json({
            status: true,
            data: { data: req.body, token },
            message: "success created users"
        })
    } catch (error) {
        return next(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        let isMatched = false
        const user = await Users.findOne({
            where: {
                username: req.body.username,
            },
        })
        if (user) {
            isMatched = await bcrypt.compare(req.body.password, user.password);
            if (isMatched) {
                const token = await tokenService.createToken({ username: user.username })
                return res.status(200).json({
                    status: true,
                    data: {
                        token
                    },
                    message: "Login Success"
                })
            }
        }
        return res.status(401).json({
            status: false,
            data: [],
            message: "Invalid username or password"
        })
    } catch (error) {
        return next(error)
    }
}

module.exports.validate = (method) => {
    switch (method) {
        case 'signup': {
            return [
                body('username').isLength({ min: 2 }).withMessage('Minimal 2 character'),
                body('password').isLength({ min: 5 }).withMessage('Minimal 5 character'),
            ]
        }
    }
}