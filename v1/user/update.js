const { encryptPss, validateEmail, passwordCheck } = require(__dirname + "./../../utils/user_utils");
const { end_time_post } = require(__dirname + "./../../utils/statsd_utils");

const update = async (user, payload) => {
    /* console.log("HERE ", req); */

    if (payload && Object.keys(payload).length == 0) {
        return { status: 400 };
    }

    /**
     * check for read only fields
     */
    if ("id" in payload || "pk" in payload || "account_created" in payload || "account_updated" in payload) {
        return { status: 400, message: "ReadOnly field provided" };
    }

    if ("first_name" in payload && payload.first_name == '') {
        return {
            status: 400,
            message: "first_name cannot be empty"
        }
    }

    if ("password" in payload) {
        const passCheck = passwordCheck(payload.password);
        if(passCheck.status != 200) {
            return passCheck;
        }
        payload.password = await encryptPss(payload.password);
    }

    if ("username" in payload) {
        const unameCheck = validateEmail(payload.username);
        if(unameCheck.status != 200) {
            return unameCheck;
        }
    }

    try {
        const ans = await user.update({ ...payload, account_updated: Date.now() });
        return { status: 204 };
    } catch (error) {
        return { status: 400, message: error.message };
    }

};

module.exports = ('/', async (req, res) => {
    try {
        const response = await update(req.user, req.body);
        end_time_post(req);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        end_time_post(req);
        return res.status(400).json({ message: error.message });
    };
});
