const { createPool } = require('mysql2/promise');

const pool = createPool({
    host: process.env.HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.USER
})

module.exports = pool;