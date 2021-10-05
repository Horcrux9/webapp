const bcrypt = require("bcrypt");
const { User } = require(__dirname + "./../models");


const _toB64 = (string) => {
    return (Buffer.from(string, "utf-8").toString("base64"));
}

const _fromB64 = (string) => {
    return (Buffer.from(string, "base64").toString("utf-8"));
}

const _validateP = async (utfP, bcryptP) => {
    return (await bcrypt.compare(utfP, bcryptP));
};

const _findUser = async (uname) => {
    return (await User.findOne({
        where: {username: uname},
    }));
}

const getCredentialsfToken = (token) => {
    const splitT = token.split(' ');
    token = splitT.length == 2 ? splitT[1] : splitT[0];

    const utfT = _fromB64(token);
    const sUtfT = utfT.split(':');

    if (sUtfT.length != 2) {
        return {username: undefined, password: undefined};
    }

    return {
        username: sUtfT[0],
        password: sUtfT[1]
    };
}

const authenticate = async (uname, pss) => {
    const user = await _findUser(uname);

    if (! user) {
        return {
            status: 404, /* Not found */
            message: "User not found",
            user: undefined,
        }
    }

    if (! (await _validateP(pss, user.password))) {
        return {
            status: 401, /* unauthorized */
            message: "unauthorized",
            user: undefined,
        }
    }

    return {
        status: 200,
        message: "OK",
        user: user
    }
}

const genToken = async (uname, pss) => {

    const response = await authenticate(uname, pss);
    if (response.status != 200) {
        return response;
    }

    return {
        status: 200, /* OK */
        message: "OK",
        token: _toB64(uname + ':' + pss)
    };
};

module.exports = {
    genToken,
    getCredentialsfToken,
    authenticate
};
