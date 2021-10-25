const mainRouter = require("express").Router();
const {
    authentication
} = require(__dirname + "./../../../auth/auth");
/*
const {
    getFormData
} = require(__dirname + "./../../../utils/image_utils");
*/
const bodyparser = require('body-parser');


mainRouter.post('/', authentication, bodyparser.raw({
    limit: "3mb",
    type: "image/*",
}), require("./set"));
mainRouter.get('/', authentication, require("./get"));
mainRouter.delete('/', authentication, require("./delete"));

module.exports = mainRouter;