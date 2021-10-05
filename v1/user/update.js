const { authFrmTkn } = require(__dirname + "./../../auth/auth");
const { User } = require(__dirname + "./../../models");

const update = async (token, payload) => {
    /* console.log("HERE ", req); */

    if (payload && Object.keys(payload).length == 0) {
        return { status: 400 };
    }

    /**
     * check for read only fields
     */
    if ("id" in payload || "pk" in payload || "account_created" in payload || "account_updated" in payload) {
        return { status: 400 };
    }

    const response = await authFrmTkn(token);

    if (response.status != 200) {
        return response;
    }

    try {
        const ans = await response.user.update({ ...payload, account_updated: Date.now() });
        return { status: 204 };
    } catch (error) {
        return { status: 400 };
    }

};

module.exports = ('/', async (req, res) => {
    try {
        const response = await update(req.headers.authorization, req.body);
        return res.status(response.status).send();
    } catch (error) {
        return res.status(400).send();
    };
});

