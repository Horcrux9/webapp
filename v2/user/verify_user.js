const router = require("express").Router();
const {
    User
} = require(__dirname + "./../../models");
const {
    end_time_post
} = require(__dirname + "./../../utils/statsd_utils");
const {
    validateEmail,
    userExists
} = require(__dirname + "./../../utils/user_utils");
const logger = require(__dirname + "./../../config/logger").getLogger();
const statsd_client = require(__dirname + "./../../utils/statsd");
const { get_token } = require(__dirname + "./../../utils/email_verification_utils");

const try_verification = async (data) => {
    const response = validateEmail(data.email);
    if (response.status != 200) {
        return "Invalid link!";
    }

    const user = await userExists({
        username: data.email
    });
    if (!user) {
        return "Invalid link!";
    }

    const token = await get_token(data.email);
    if (token.status != 200) {
        return token.status + " :: " + token.message;
    }

    if (token.token != data.token) {
        return "Invalid link!";
    }

    if (user.verified == true && (user.verified_on != null && user.verified_on < Date.now())) {
        return "Already verified!"
    }

    await user.update({
        verified: true,
        verified_on: Date.now()
    });

    return "Done!";
}

router.get('/', async (req, res, next) => {
    try {
        // end_time_post(req);

        const response = await try_verification(req.query);

        return res.send(response);
    } catch (error) {
        // end_time_post(req);
        return res.send(error.message);
    }
});

module.exports = router;