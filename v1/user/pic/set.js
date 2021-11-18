const {
    Image
} = require(__dirname + "./../../../models");
const {
    profilePicExists,
    /* typeCheck, */
    fileNameForStorage,
} = require(__dirname + "./../../../utils/image_utils");
const {
    S3,
    bucketName
} = require(__dirname + "./../../../s3/s3");
const uuid = require("uuid");
const { deleteHelper } = require("./delete");
const { end_time_post } = require(__dirname + "./../../../utils/statsd_utils");
const statsd_client = require(__dirname + "./../../../utils/statsd");

const set = async (req) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return {
            status: 400,
            message: "Error: File upload only supports the following filetypes - " + allowedTypes,
        };
    }

    let image = await profilePicExists(req.user.id);

    await deleteHelper(image);

    const fname = fileNameForStorage();
    const params = {
        Bucket: bucketName,
        Key: uuid.v4() + '/' + fname,
        Body: req.body
    };

    const start_time = new Date();
    const data = await S3.upload(params).promise();
    // cloudwatch metric
    statsd_client.timing(`S3-UPLOAD`, (new Date() - start_time));

    try {
        if (image) {
            await image.update({
                file_name: fname,
                upload_date: Date.now(),
                url: data.Location,
            });
        } else {
            image = await Image.create({
                id: req.user.id,
                file_name: fname,
                url: data.Location,
            });
        }
    } catch (error) {
        return {
            status: 400,
            message: error.message,
        };
    }

    return {
        status: 200,
        ...image.toJSON(),
    };
};


module.exports = ('/', async (req, res, next) => {
    try {
        const response = await set(req);
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