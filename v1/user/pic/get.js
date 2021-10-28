const {
    profilePicExists,
} = require(__dirname + "./../../../utils/image_utils");

const get = async (req) => {
    const exists = await profilePicExists(req.user.id);
    if (exists) {
        return {
            status: 200,
            ...exists.toJSON(),
        };
    }
    return {
        status: 404,
        message: "Profile pic does not exist",
    };
};

module.exports = ('/', async (req, res, next) => {
    try {
        const response = await get(req);
        return res.status(response.status).json({
            ...response,
            status: undefined
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    };
});