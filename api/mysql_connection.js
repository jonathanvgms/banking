const mysql = require('mysql');
const config = require('fs');
const { loggers } = require('winston');

const logger = loggers.get('logger')

let mysql_connection = null;

module.exports = {
    connect: () => {
        let data = JSON.parse(config.readFileSync(__dirname + '/config.json'));
        let connectionString = data.database.connection;
        logger.info('Mysql connection string: ', connectionString);

        mysql_connection = mysql.createConnection({
            host: connectionString.host,
            database: connectionString.database,
            user: connectionString.user,
            password: connectionString.password
        }, err => {
            if (err) {
                logger.error('Mysql create connection error', err);
                throw err;
            }
        });

        logger.info('Mysql create connection success..');

        mysql_connection.connect(err => {
            if (err) {
                logger.error('Mysql connection error', err);
                throw err;
            }
        });

        logger.info('Mysql connected success..');

        return mysql_connection;
    },
    db: () => {
        return mysql_connection;
    },
    close: () => {
        mysql_connection.close();

        logger.info('Mysql close connection success..');
    }
};