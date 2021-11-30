const mainRouter = require("express").Router();

mainRouter.use("/user", require("./user/controller"));
mainRouter.use("/auth", require("./auth/controller"));

mainRouter.use("/verifyUserEmail", require("./user/verify_user"));

module.exports = mainRouter;
