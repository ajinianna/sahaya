const Pool = require('pg').Pool
// Database connection initiase
const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sahaya',
  password: 'password',
  port: 5432,
})

module.exports = connection