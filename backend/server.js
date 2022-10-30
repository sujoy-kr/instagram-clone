const {PORT} = require('./utils/env_config')
const app = require('./app')

const db = require('./models')

const http = require('http')
const server = http.createServer(app);

// connect to database and log if error
(async () => {
    try {

        await db.sequelize.sync()
    } catch (e) {
        console.log(e)
    }
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`)
    })
})()
