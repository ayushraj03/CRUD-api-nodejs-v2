const pool  = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "123db456",
    database: "todo_database",
    host: "localhost",
    port: 5432
});

module.exports = pool;