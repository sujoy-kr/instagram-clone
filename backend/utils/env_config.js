const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_HOST = process.env.DB_HOST
const JWT_KEY = process.env.JWT_KEY
// putting + in front of strings turn them into integers
const SALT_ROUND = +process.env.SALT_ROUND
const BCRYPT_PASS = process.env.BCRYPT_PASS
const CORS_ORIGIN = process.env.CORS_ORIGIN

module.exports = {
    PORT,
    NODE_ENV,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_HOST,
    JWT_KEY,
    SALT_ROUND,
    BCRYPT_PASS,
    CORS_ORIGIN
}
