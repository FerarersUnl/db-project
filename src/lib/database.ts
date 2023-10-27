const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'app',
    password: 'admin',
    port: 5432 // or your custom port
});

export default pool;
