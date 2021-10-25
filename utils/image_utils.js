const {
    Image
} = require("../models");
const path = require("path");
const uuid = require("uuid");
const multer = require("multer");

const profilePicExists = async (userId) => {
    try {
        return Image.findOne({
            where: {
                id: userId
            }
        });
    } catch (error) {
        return undefined;
    }
}

const typeCheck = (file) => {
    const allowedTypes = /jpeg|jpg|png/;
    var mimetype = allowedTypes.test(file.mimetype);
    var extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return {
            status: 200,
            message: "OK",
        };
    }
    return {
        status: 400,
        message: "Error: File upload only supports the following filetypes - " + allowedTypes,
    };
}

const fileNameForStorage = (file) => {
    return `${file.fieldname}_${uuid.v4()}${path.extname(file.originalname)}`;
}

const _storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, '');
    }
});

const getFormData = multer({
    storage: _storage,
});

module.exports = {
    profilePicExists,
    typeCheck,
    fileNameForStorage,
    getFormData,
};