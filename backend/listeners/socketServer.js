const {JWT_KEY} = require('../utils/env_config')
const jwt = require('jsonwebtoken')
// const {message: Message, user: User} = require('../models')
const messageSockets = require('./MessageSockets')

const socketServer = async (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        }
    })

    // socket authentication with jwt
    io.use((socket, next) => {
        const token = socket.handshake.query.token
        if (socket.handshake.query && token) {
            jwt.verify(token, JWT_KEY, (err, decoded) => {
                if (err) {
                    return new Error('authentication failed')
                }
                socket.decoded = decoded
                // print socket id
                socket.id = decoded.username
                next()
            })
        } else {
            next(new Error('authentication failed'))
        }
    }).on('connection', (socket) => {
        messageSockets(socket, io)

        socket.on('disconnect', () => {
            console.log(socket.id, ' disconnected')
        })
    })
}

module.exports = socketServer