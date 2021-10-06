const { User } = require("../models");
const bcrypt = require("bcrypt");

const userExists = async (payload) => {
    try {
        return User.findOne({ where: payload });
    } catch (error) {
        return undefined;
    }
}

const passwordCheck = (password) => {
    if (password.length < 5) {
        return {
            status: 400,
            message: "Password should be > 5 characters",
        }
    }

    return {
        status: 200,
        message: "OK",
    }
}

const _vEmail = (username) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(username);
}

const validateEmail = (username) => {
    if (_vEmail(username)) {
        return {
            status: 200,
            message: "OK",
        };
    } else {
        return {
            status: 400,
            message: "Provide a valid username(email)",
        };
    }
}

const encryptPss = async (pss) => {
    const salt = await bcrypt.genSalt(10);
    return (await bcrypt.hash(pss, salt));
}

module.exports = {
    userExists,
    passwordCheck,
    validateEmail,
    encryptPss,
    _vEmail
};
