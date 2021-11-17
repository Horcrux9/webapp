const { end_time_post } = require(__dirname + "./../../utils/statsd_utils");

const view = async (user) => {

    return {
        ...user.toJSON(),
        status: 200,
    }

}

module.exports = ('/', async (req, res) => {
    try {
        const response = await view(req.user);
        end_time_post(req);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        end_time_post(req);
        return res.status(500).json({message: "Bad request!"});
    }
});
