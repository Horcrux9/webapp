const bcrypt = require("bcrypt");
const { User } = require(__dirname + "./../models");


const _toB64 = (string) => {
    return (Buffer.from(string).toString("base64"));
}

const _fromB64 = (string) => {
    return (Buffer.from(string).toString("utf-8"));
}

const _validateP = async (utfP, bcryptP) => {
    return (await bcrypt.compare(utfP, bcryptP));
};

const _findUser = async (uname) => {
    return (await User.findOne({
        where: {username: uname},
    }));
}

const genToken = async (uname, pss) => {
    const user = await _findUser(uname);

    if (! user) {
        return {
            status: 404, /* Not found */
            message: "User not found"
        }
    }

    if (! (await _validateP(pss, user.password))) {
        return {
            status: 401, /* Unauthorized */
            message: "Unauthorized"
        }
    }

    return {
        status: 200, /* OK */
        message: "OK",
        token: _toB64(uname + ':' + pss)
    };

};

module.exports = { genToken };