const {
    profilePicExists,
    getKeyfromUrl,
} = require(__dirname + "./../../../utils/image_utils");
const {
    S3,
    bucketName
} = require(__dirname + "./../../../s3/s3");

const deleteFunc = async (req) => {
    const exists = await profilePicExists(req.user.id);
    if (exists) {
        try {
            await S3.deleteObject({
                Bucket: bucketName,
                Key: getKeyfromUrl(exists.url),
            }).promise();

            await exists.destroy();

        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }

        return {
            status: 204,
        };
    }
    return {
        status: 404,
        message: "Profile pic does not exist",
    };
};

module.exports = ('/', async (req, res, next) => {
    try {
        const response = await deleteFunc(req);
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