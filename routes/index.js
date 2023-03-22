const { Router } = require('express')
const router = Router()
const { validationResult } = require('express-validator')

const {
    validateLogin,
} = require('../middlewares/token')

const authController = require('../controller/AuthController')
const userController = require('../controller/UserController')

const errorHanlderValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

router.post('/auth/signup', [authController.validate('signup'), errorHanlderValidation], authController.signup)
router.post('/auth/login', authController.login)
router.get('/user/userlist', validateLogin, userController.list)

module.exports = router