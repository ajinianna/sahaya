const Pool = require('pg').Pool
// Database connection initialize
const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sahaya',
  password: 'password',
  port: 5432,
})

module.exports = connection