const { genToken } = require(__dirname + "./../../auth/auth");

module.exports = ('/', async (req, res) => {
    try {
        const response = await genToken(req.body.username, req.body.password);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Bad request!"});
    }
});
