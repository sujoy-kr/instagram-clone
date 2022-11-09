const {PORT} = require('./utils/env_config')
const app = require('./app')

const socketServer = require('./listeners/socketServer')

const db = require('./models')

const http = require('http')
const server = http.createServer(app);

// connect to database and log if error
(async () => {
    try {
        // connect to database
        await db.sequelize.sync()

        // start socket server
        await socketServer(server)

        // start http server
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}.`)
        })
    } catch (e) {
        console.log(e)
    }
})()