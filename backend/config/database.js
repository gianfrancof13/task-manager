//require('dotenv').config(); probado
//console.log(process.env.DB_USER, process.env.DB_PASSWORD); funciona ok

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
