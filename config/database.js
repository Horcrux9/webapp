const {
    Sequelize
} = require('sequelize');

const {
    MODE
} = require("./env");
const config = require("./config.js")[MODE];
const readReplica = require("./config.js")["read-replica"];

// module.exports = new Sequelize(config.database, config.username, config.password, config);
module.exports = new Sequelize(config.database, config.username, config.password, {
    dialect: "postgres",
    replication: {
        read: {
            host: readReplica.host,
        },
        write: {
            host: config.host,
        },
    }
});