const mainRouter = require("express").Router();

mainRouter.use("/user", require("./user/controller"));

module.exports = mainRouter;