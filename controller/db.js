var mysql = require("mysql");
var dotenv = require("dotenv");
dotenv.config();

module.exports.pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  multipleStatements: true,
  debug: true
});
