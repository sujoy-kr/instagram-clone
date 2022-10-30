const {verify} = require('./jwt')

const required = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1]
        try {
            req.user = verify(token)
            next()
        } catch (e) {
            res.status(403).json({message: 'invalid token'})
        }
    } else {
        return res.status(403).json({message: 'unauthorized'})
    }
}

module.exports = {required}