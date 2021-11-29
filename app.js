const express = require("express");
const { sequelize } = require("./models");
const { PORT } = require("./config/env");


const app = express();

/**
 * https://stackoverflow.com/questions/59415417/what-is-the-best-way-of-separating-dev-and-prod-modes-in-the-app
 */

/**
 * Main page
 */
require("./controller")(app);

app.listen(PORT, async () => {
    /**
     * Sync tables
     */
    sequelize.authenticate();
    console.log("Database connected!");
    console.log(`App at http://127.0.0.1:${PORT}`);
});
