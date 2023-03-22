require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        timezone: '+07:00',
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;

if (process.env.MIGRATE_DB == 'TRUE') {
    sequelize.sync({
        alter: {
            drop: false
        }
    }).then(() => {
        console.log(`All tables synced!`);
    });
}