var dotenv = require("dotenv");
dotenv.config();
module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    operatorsAliases: false,
    logging: false
  },
  test: {
    username: "aardvark",
    password: "skyl4rkjok3r",
    database: "ssdb",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false,
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    operatorsAliases: false,
    logging: false
  }
};
