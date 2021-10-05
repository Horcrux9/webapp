const mainRouter = require("express").Router();

mainRouter.use('/', require("./create"));

// TODO
// mainRouter.route("/self")
//     .get(require("./view"))
//     .put(require("./update"));

mainRouter.get("/self", require("./view"));
mainRouter.put("/self", require("./update"));

module.exports = mainRouter;