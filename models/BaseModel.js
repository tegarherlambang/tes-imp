const sequelize = require('../db')

const { UsersModel } = require('./UsersModel')

const Users = UsersModel(sequelize)
module.exports = {
    Users,
}