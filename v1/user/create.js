const router = require("express").Router();
const { User } = require(__dirname + "./../../models");
const { userExists, passwordCheck, validateEmail, encryptPss } = require(__dirname + "./../../utils/user_utils");
const { end_time_post } = require(__dirname + "./../../utils/statsd_utils");
const logger = require(__dirname + "./../../config/logger").getLogger();


const create = async (payload) => {
    logger.info(`CREATE PAYLOAD ::: ${JSON.stringify(payload)}`);

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
    try {
        const response = await create(req.body);
        end_time_post(req);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        end_time_post(req);
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;
