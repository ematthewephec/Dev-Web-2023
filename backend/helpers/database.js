const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORDDB,
    database: 'informateur',
    port: 3307,
    connectionLimit: 5,
    supportBigNumbers: true,
    bigNumberStrings: true,
});

// connect and check for errors
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections');
        }
        if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused');
        }
    }
    if (connection) connection.release();
        return;
});

module.exports = pool;
