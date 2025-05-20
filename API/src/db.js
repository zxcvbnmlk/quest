const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'quest',
    password: '111',
    port: 5432,
});

module.exports = pool;
