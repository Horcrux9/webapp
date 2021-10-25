// https://stackoverflow.com/questions/65894377/nodejs-multer-s3-can-upload-to-s3-without-using-credentials
// https://stackoverflow.com/questions/40666877/uploading-file-using-multer-is-not-working-fully-nodejs
// https://stackoverflow.com/questions/41432403/how-to-prevent-files-from-being-uploaded-with-multer-unless-they-are-images
// https://www.youtube.com/watch?v=9kWz8oj8hbk
const {
    Image
} = require(__dirname + "./../../../models");
const {
    profilePicExists,
    typeCheck,
    fileNameForStorage,
} = require(__dirname + "./../../../utils/image_utils");
const {
    S3,
    bucketName
} = require(__dirname + "./../../../s3/s3");

const set = async (req) => {

    const response = typeCheck(req.file);
    if (response.status != 200) {
        return response;
    }

    let image = await profilePicExists(req.user.id);

    const params = {
        Bucket: bucketName,
        Key: fileNameForStorage(req.file),
        Body: req.file.buffer
    };

    const data = await S3.upload(params).promise();

    try {
        if (image) {
            await image.update({
                file_name: req.file.originalname,
                upload_date: Date.now(),
                url: data.Location,
            });
        } else {
            image = await Image.create({
                id: req.user.id,
                file_name: req.file.originalname,
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