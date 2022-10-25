const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_HOST = process.env.DB_HOST;

module.exports = {
  PORT,
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
};
