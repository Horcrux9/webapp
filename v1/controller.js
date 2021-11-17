const mainRouter = require("express").Router();
const counter = require(__dirname + "./../utils/counter");

mainRouter.use("/user", counter, require("./user/controller"));
mainRouter.use("/auth", counter, require("./auth/controller"));

module.exports = mainRouter;
