const { _toB64, authenticate } = require(__dirname + "./../../auth/auth");
const { end_time_post } = require(__dirname + "./../../utils/statsd_utils");


const genToken = async (uname, pss) => {
    const response = await authenticate(uname, pss);
    if (response.status != 200) {
        return response;
    }

    return {
        status: 200, /* OK */
        message: "OK",
        token: _toB64(uname + ':' + pss)
    };
};


module.exports = ('/', async (req, res) => {
    try {
        const response = await genToken(req.body.username, req.body.password);
        end_time_post(req);
        return res.status(response.status).json({ ...response, status: undefined });
    } catch (error) {
        console.error(error);
        end_time_post(req);
        return res.status(500).json({message: "Bad request!"});
    }
});
