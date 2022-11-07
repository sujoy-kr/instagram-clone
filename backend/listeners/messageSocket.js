const {CORS_ORIGIN} = require('../utils/env_config')

const socketServer = (server) => {
    // create socket server and set reconnection false
    const io = require('socket.io')(server, {
        cors: {
            origin: CORS_ORIGIN,
        }
    })

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id)

        socket.on('message', (message) => {
            console.log(message)
            socket.emit('message', message)
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id)
        })
    })
}

module.exports = socketServer