const router = require("express").Router();
const { User } = require(__dirname + "./../../models");
const bcrypt = require("bcrypt");


const create = async (payload) => {
    const {
        first_name,
        last_name,
        username,
        password
    } = payload;

    const salt = await bcrypt.genSalt(10);
    const cryptP = await bcrypt.hash(password, salt);

    const user = await User.create({
        first_name: first_name,
        last_name: last_name, 
        username: username,
        password: cryptP
    });
    return user;
}

router.post('/', async (req, res, next) => {
    try {
        const user = await create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
});

module.exports = router;
