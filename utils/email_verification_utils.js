const AWS = require("aws-sdk");
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1",
});

const create_token = async (email) => {
    const ttl = Math.floor(Date.now() / 1000 ) + (60 * 1); // now + 5 mins
    try {
        const ans = await dynamoDB
            .put({
                Item: {
                    id: email,
                    email: email,
                    token: uuid.v4(),
                    ttl: ttl,
                },
                TableName: process.env.DDB_H || "csye6225",
            })
            .promise()
            .catch(error => {
                return {
                    status: 500,
                    message: error
                };
            });
        // .then(data => console.log(data.Attributes))
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }

    return {
        status: 200,
        message: "Ok"
    };
}

const get_token = async (email) => {
    try {
        const ans = await dynamoDB
            .get({
                Key: {
                    id: email,
                },
                TableName: process.env.DDB_H || "csye6225",
            })
            .promise();

        if (! ans.Item) {
            return {
                status: 404,
                message: "Not found"
            };
        }

        return {
            status: 200,
            token: ans.Item.token,
            message: "OK"
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}


module.exports = {
    create_token,
    get_token,
};