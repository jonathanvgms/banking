const express = require('express');
const router = express.Router();
const { loggers } = require('winston');
const mysql_connection = require('../mysql_connection');

const logger = loggers.get('logger');

router.get('/account', (req, res) => {

    let connection = mysql_connection.connect();

    let query = 'select * from account';

    connection.query(query, (err, rows) => {
        if (err) {
            logger.error(`Mysql query ${query}`, err);
            throw err;
        }

        connection.end();

        res.send(rows);

        logger.info('Response: ' + JSON.stringify(rows));
    });
});

router.get('/account/:id', (req, res) => {
    let connection = mysql_connection.connect();

    let query = `select * from account where ACCOUNT_ID = ${req.params.id}`;

    connection.query(query, (err, rows) => {
        if (err) {
            logger.error(`Mysql query ${query}`, err);
            throw err;
        }

        connection.end();

        res.send(rows);

        logger.info('Response: ' + JSON.stringify(rows));
    });
});

module.exports = router;