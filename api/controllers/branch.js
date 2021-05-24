const express = require('express');
const router = express.Router();
const { loggers } = require('winston');
const mysql_connection = require('../mysql_connection');

const logger = loggers.get('logger');

router.get('/branch', (req, res) => {

    let connection = mysql_connection.connect();

    let query = 'select * from branch';

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

router.post('/branch', (req, res) => {
    console.log(req.body)

    let connection = mysql_connection.connect();

    let query = `insert into branch (address, city, name, state, zip_code) values ('${req.body.address}','${req.body.city}','${req.body.name}','${req.body.state}','${req.body.zipCode}')`;

    connection.query(query, (err, rows) => {
        if (err) {
            logger.error(`Mysql query ${query}`, err);
            throw err;
        }

        connection.end();
    });

    res.sendStatus(200)
});

router.get('/branch/:id', (req, res) => {
    let connection = mysql_connection.connect();

    let query = `select * from branch where BRANCH_ID = ${req.params.id}`;

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