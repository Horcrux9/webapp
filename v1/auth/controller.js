const mainRouter = require("express").Router();

mainRouter.post('/token', require("./getToken"));

module.exports = mainRouter;