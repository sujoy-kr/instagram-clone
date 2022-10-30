const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('./env_config')

const sign = (user) => {
    return jwt.sign(user, JWT_KEY, {algorithm: 'HS256'})
}

const verify = (token) => {
    return jwt.verify(token, JWT_KEY)
}

module.exports = {sign, verify}