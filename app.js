const express = require("express");
const db = require("./config/database");
const { sequelize } = require("./models");
const { PORT } = require("./config/env");


const app = express();

/**
 * https://stackoverflow.com/questions/59415417/what-is-the-best-way-of-separating-dev-and-prod-modes-in-the-app
 */

/**
 * Test database connection
 */
const testdB = async () => {
    try {
        await db.authenticate();
        console.log("Database connected ...");
    } catch (err) {
        console.error(`DB connection error: ${err}`);
    }
}
testdB();

/**
 * Main page
 */
require("./controller")(app);

app.listen(PORT, async () => {
    /**
     * Sync tables
     */
    await sequelize.sync({ alter: true });
    console.log(`App at http://127.0.0.1:${PORT}`);
});
