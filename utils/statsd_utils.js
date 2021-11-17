const client = require("./statsd");

const counter = async (req, res, next) => {
    client.increment(`${req.method} ${req.originalUrl}`);
    next();
}

const start_time = async (req, res, next) => {
    req.start_time = new Date();
    next();
}

const end_time_post = async (req) => {
    if (req.start_time === undefined) return;

    client.timing(`${req.method} ${req.originalUrl}`, new Date() - req.start_time);
    req.start_time = new Date();
}

module.exports = {
    counter,
    start_time,
    end_time_post,
};