var mysql = require("mysql");

module.exports.pool = mysql.createPool({
  host: "localhost",
  user: "aardvark",
  password: "skyl4rkjok3r",
  database: "ssdb",
  multipleStatements: true
});
