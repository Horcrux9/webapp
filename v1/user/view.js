const { authFrmTkn } = require(__dirname + "./../../auth/auth");

const view = async (token) => {
    const response = await authFrmTkn(token);

    if (response.status != 200) {
        return response;
    }

    return {
        ...response.user.toJSON(),
        status: 200,
    }

}

module.exports = ('/', async (req, res) => {
    try {
        const response = await view(req.headers.authorization);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        return res.status(500).json({message: "Bad request!"});
    }
});
