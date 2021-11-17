const statsd_client = require("./statsd");

module.exports = async (req, res, next) => {
    statsd_client.increment(req.originalUrl + '_' + req.method);
    next();
}