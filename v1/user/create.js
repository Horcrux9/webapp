const router = require("express").Router();
const { User } = require(__dirname + "./../../models");
const { userExists, passwordCheck, validateEmail, encryptPss } = require(__dirname + "./../../utils/user_utils");
const { statsd_client } = require(__dirname + "./../../utils/statsd");


const create = async (payload) => {
    const {
        first_name, last_name, username, password
    } = payload;

    const exists = await userExists({ username });

    if (first_name == '') {
        return {
            status: 400,
            message: "first_name cannot be empty"
        }
    }

    if (exists) {
        return {
            status: 400,
            message: "User already exists"
        };
    }

    const passCheck = passwordCheck(password);
    if(passCheck.status != 200) {
        return passCheck;
    }

    const unameCheck = validateEmail(username);
    if(unameCheck.status != 200) {
        return unameCheck;
    }

    const cryptP = await encryptPss(password);

    const user = await User.create({
        first_name: first_name,
        last_name: last_name, 
        username: username,
        password: cryptP
    });

    return {
        status: 201,
        ...user.toJSON()
    };
}

router.post('/', async (req, res, next) => {
    statsd_client.increment("create_counter");
    try {
        const response = await create(req.body);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
