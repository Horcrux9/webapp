const AWS = require('aws-sdk');

const S3 = new AWS.S3();

const bucketName = process.env.S3_B;

module.exports = {
    S3,
    bucketName,
}