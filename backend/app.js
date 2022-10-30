const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
// config files
const config = require('./utils/env_config')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(require('./routes'))
app.use('/uploads', express.static(__dirname + '/uploads'))

const isProduction = config.NODE_ENV === 'production'

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('not found')
    err.status = 404
    next(err)
})

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use((err, req, res) => {
        console.log(err)
        res.status(err.status || 500).json({
            message: err.message,
            error: err,
        })
    })
}

// production error handler
// no stacktrace leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: {},
    })
})

module.exports = app
