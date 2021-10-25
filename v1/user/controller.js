const mainRouter = require("express").Router();
const { authentication } = require(__dirname + "./../../auth/auth");


mainRouter.use('/', require("./create"));

// TODO
// mainRouter.route("/self")
//     .get(require("./view"))
//     .put(require("./update"));

mainRouter.get("/self", authentication, require("./view"));
mainRouter.put("/self", authentication, require("./update"));

mainRouter.use("/self/pic", require("./pic/controller"));

module.exports = mainRouter;
