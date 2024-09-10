const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Relación: un usuario tiene muchas tareas
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
