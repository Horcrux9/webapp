const mainRouter = require("express").Router();
const {
    authentication,
    is_verified,
} = require(__dirname + "./../../auth/auth");


mainRouter.use('/', require("./create"));

// TODO
// mainRouter.route("/self")
//     .get(require("./view"))
//     .put(require("./update"));

mainRouter.get("/self", authentication, is_verified, require("./view"));
mainRouter.put("/self", authentication, is_verified, require("./update"));

mainRouter.use("/self/pic", require("./pic/controller"));

module.exports = mainRouter;