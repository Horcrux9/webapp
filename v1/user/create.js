const router = require("express").Router();

router.get('/', (req, res) => {
    res.send("CREATE");
});

module.exports = router;
