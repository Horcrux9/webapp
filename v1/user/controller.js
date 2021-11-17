const mainRouter = require("express").Router();
const { authentication } = require(__dirname + "./../../auth/auth");
const counter = require(__dirname + "./../../utils/counter");


mainRouter.use('/', counter, require("./create"));

// TODO
// mainRouter.route("/self")
//     .get(require("./view"))
//     .put(require("./update"));

mainRouter.get("/self", counter, authentication, require("./view"));
mainRouter.put("/self", counter, authentication, require("./update"));

mainRouter.use("/self/pic", counter, require("./pic/controller"));

module.exports = mainRouter;
