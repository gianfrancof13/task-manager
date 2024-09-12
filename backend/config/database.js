require('dotenv').config();
//console.log(process.env.DB_USER, process.env.DB_PASSWORD);
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3307
});

module.exports = sequelize;
