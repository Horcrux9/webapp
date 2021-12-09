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
    dialectOptions: {
       ssl: true
    },
    replication: {
        read: {
            host: readReplica.host,
            pool: {
                min: readReplica.pool.min,
                max: readReplica.pool.max,
                idle: readReplica.pool.idle,
            },
        },
        write: {
            host: config.host,
            pool: {
                min: config.pool.min,
                max: config.pool.max,
                idle: config.pool.idle,
            },
        },
    }
});