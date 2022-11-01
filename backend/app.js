const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(require('./routes'))
app.use('/uploads', express.static(__dirname + '/uploads'))

// 404 error handler
app.use((req, res,) => {
    res.status(404).json({
        message: 'not found',
    })
})

module.exports = app
