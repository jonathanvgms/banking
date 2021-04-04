const express = require('express');
const router = express.Router();
const { loggers } = require('winston');
const mysql_connection = require('../mysql_connection');

const logger = loggers.get('logger');

router.get('/customer', (req, res) => {

    let connection = mysql_connection.connect();

    let query = 'select * from customer';

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

router.get('/customer/:id', (req, res) => {

    let connection = mysql_connection.connect();

    let query = `select * from customer where CUST_ID = ${req.params.id}`;

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