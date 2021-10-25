
const view = async (user) => {

    return {
        ...user.toJSON(),
        status: 200,
    }

}

module.exports = ('/', async (req, res) => {
    try {
        const response = await view(req.user);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        return res.status(500).json({message: "Bad request!"});
    }
});
