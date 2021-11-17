const mainRouter = require("express").Router();

mainRouter.use("/user", require("./user/controller"));
mainRouter.use("/auth", require("./auth/controller"));

module.exports = mainRouter;
