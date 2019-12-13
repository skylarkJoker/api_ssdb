require("dotenv").config();

module.exports = {
  development: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: "postgres",
    operatorsAliases: false,
    logging: false
  },
  test: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: "postgres",
    operatorsAliases: false,
    logging: false
  },
  production: {
    username: "",
    password: "",
    database: "",
    host: "",
    dialect: "postgres",
    operatorsAliases: false,
    logging: false
  }
};
