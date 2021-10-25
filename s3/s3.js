const AWS = require('aws-sdk');

const S3 = new AWS.S3();

const bucketName = "mytestbucket-mj";

module.exports = {
    S3,
    bucketName,
}