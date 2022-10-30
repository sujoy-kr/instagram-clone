const db_config = require('./env_config')

module.exports = {
    development: {
        username: db_config.DB_USERNAME,
        password: db_config.DB_PASSWORD,
        database: db_config.DB_DATABASE,
        host: db_config.DB_HOST,
        dialect: 'postgres',
    }, test: {
        username: 'root', password: null, database: 'database_test', host: '127.0.0.1', dialect: 'mysql',
    }, production: {
        username: 'root', password: null, database: 'database_production', host: '127.0.0.1', dialect: 'mysql',
    },
}
