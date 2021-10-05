const { getCredentialsfToken, authenticate } = require(__dirname + "./../../auth/auth");

const view = async (token) => {
    const response = getCredentialsfToken(token);
    if (! response.username || ! response.password) {
        return {
            status: 401, /* Unauthorized */
            message: "Unauthorized"
        }
    }

    const authResponse = await authenticate(response.username, response.password);
    if (authResponse.status != 200) {
        return response;
    }

    return {
        ...authResponse.user.toJSON(),
        status: 200
    }

}

module.exports = ('/', async (req, res) => {
    try {
        const response = await view(req.headers.authorization);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Bad request!"});
    }
});
