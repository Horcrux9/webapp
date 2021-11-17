const mainRouter = require("express").Router();
const {
    authentication
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
const counter = require(__dirname + "./../../../utils/counter");


mainRouter.post('/', counter, authentication, bodyparser.raw({
    limit: "3mb",
    type: "image/*",
}), require("./set"));
mainRouter.get('/', counter, authentication, require("./get"));
mainRouter.delete('/',counter, authentication, deleteMain);

module.exports = mainRouter;