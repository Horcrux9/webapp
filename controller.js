const express = require("express");
const { counter, start_time } = require("./utils/statsd_utils")
/**
 * Main controller
 * https://medium.com/@sesitamakloe/how-we-structure-our-express-js-routes-58933d02e491
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 * @param {*} app 
 */
module.exports = function(app) {

    /* Deprecated :P
    app.get('/', (req, res) => {
        res.send("Hello world !!\n");
    });
    */

    app.use(express.json());

    app.use("/v2", start_time, counter, require("./v2/controller"));

    app.get("/healthcheck", (req, res) => {
        res.status(200).send({status: "OK madi!"});
    });

};
