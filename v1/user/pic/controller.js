const mainRouter = require("express").Router();
const {
    authentication
} = require(__dirname + "./../../../auth/auth");
const {
    getFormData
} = require(__dirname + "./../../../utils/image_utils");

mainRouter.post('/', authentication, getFormData.single("profile"), require("./set"));
// mainRouter.get('/', require("./get"));
// mainRouter.delete('/', require("./delete"));

module.exports = mainRouter;