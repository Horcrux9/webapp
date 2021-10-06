const { Sequelize } = require('sequelize');
 
const { MODE } = require("./env");
const config = require("./config.json")[MODE];

module.exports = new Sequelize(config.database, config.username, config.password, config);
