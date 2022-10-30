const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('./env_config')

const sign = (user) => {
    const token = jwt.sign(user, JWT_KEY)
    return token
}

module.exports = {sign}