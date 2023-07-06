const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "Sangeeta@1234567",
    host: "localhost",
    port: 5432,
    database: "foodcourtinventory"
});

module.exports = pool;