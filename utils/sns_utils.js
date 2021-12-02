const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
});

const publish_sns = (email, token) => {
    const domain = (process.env.AWS_PROFILE || "prod") + ".maharshijinandra.me";
    const url = domain + "/v2/verifyUserEmail?" +
        "email=" + email + "&" +
        "token=" + token;

    try {
        var response = new AWS.SNS({
            apiVersion: "2010-03-31"
        }).publish({
            Message: url,
            TopicArn: process.env.SNS_T_ARN || "arn:aws:sns:us-east-1:290167684768:email_request"
        }).promise();

        return {
            status: 200,
            message: "Ok"
        }
    } catch (error) {
        return {
            status: 500,
            message: error.message
        }
    }
}


module.exports = {
    publish_sns,
};