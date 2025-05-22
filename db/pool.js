const { Pool } = require("pg");
require("dotenv").config();

module.export = new Pool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
})