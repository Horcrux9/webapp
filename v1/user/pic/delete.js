const {
    profilePicExists,
    getKeyfromUrl,
} = require(__dirname + "./../../../utils/image_utils");
const {
    S3,
    bucketName
} = require(__dirname + "./../../../s3/s3");
const { end_time_post } = require(__dirname + "./../../../utils/statsd_utils");


const deleteHelper = async (exists) => {
    if (exists) {
        try {
            await S3.deleteObject({
                Bucket: bucketName,
                Key: getKeyfromUrl(exists.url),
            }).promise();

        } catch (error) {
            return {
                status: 500,
                message: error.message,
            };
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

const _deleteFunc = async (req) => {
    const exists = await profilePicExists(req.user.id);
    const response = await deleteHelper(exists);

    if (exists) {
        try {
            await exists.destroy();
        } catch (error) {
            return {
                status: 500,
                message: error.message,
            };
        }
    }

    return response;
};

const deleteMain = ('/', async (req, res, next) => {
    try {
        const response = await _deleteFunc(req);
        end_time_post(req);
        return res.status(response.status).json({
            ...response,
            status: undefined
        });
    } catch (error) {
        end_time_post(req);
        return res.status(400).json({
            message: error.message
        });
    };
});

module.exports = {
    deleteMain,
    deleteHelper,
}