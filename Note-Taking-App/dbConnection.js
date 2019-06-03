"use strict"
const pg = require('pg');
require("dotenv").config();


const config = {
    user: process.env.DB_USERNAME, //'wah',
    database: process.env.DB_NAME, //'postgres',
    password: process.env.DB_PASSWORD,//'postgres', //whatever your password is, the default is postgres or password, try both
    host: process.env.WEB_HOSTNAME,//'localhost',
    port: process.env.DB_PORT,//5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const client = new pg.Client(config);
client.connect();

module.exports = client;