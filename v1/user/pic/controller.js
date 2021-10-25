const mainRouter = require("express").Router();
const {
    authentication
} = require(__dirname + "./../../../auth/auth");
const {
    getFormData
} = require(__dirname + "./../../../utils/image_utils");

mainRouter.post('/', authentication, getFormData.single("profile"), require("./set"));
mainRouter.get('/', authentication, require("./get"));
mainRouter.delete('/', authentication, require("./delete"));

module.exports = mainRouter;