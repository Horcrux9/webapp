const mainRouter = require("express").Router();
const {
    authentication,
    is_verified,
} = require(__dirname + "./../../../auth/auth");
/*
const {
    getFormData
} = require(__dirname + "./../../../utils/image_utils");
*/
const bodyparser = require("body-parser");
const {
    deleteMain
} = require("./delete");


mainRouter.post('/', authentication, is_verified, bodyparser.raw({
    limit: "3mb",
    type: "image/*",
}), require("./set"));
mainRouter.get('/', authentication, is_verified, require("./get"));
mainRouter.delete('/', authentication, is_verified, deleteMain);

module.exports = mainRouter;