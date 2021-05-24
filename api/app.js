const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.port || 3000;
const { format, transports, loggers } = require('winston');
const { combine, timestamp, label, printf } = format;

//logger
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

loggers.add('logger', {
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/logs.txt' }),
    ]
})

const logger = loggers.get('logger')

app.use(bodyParser.json())
app.use(cors())

//endpoints
app.use('/api', require('./controllers/business'));
app.use('/api', require('./controllers/customer'));
app.use('/api', require('./controllers/department'));
app.use('/api', require('./controllers/employee'));
app.use('/api', require('./controllers/branch'));
app.use('/api', require('./controllers/account'));
app.use('/api', require('./controllers/acc_transaction'));
app.use('/api', require('./controllers/individual'));
app.use('/api', require('./controllers/officer'));
app.use('/api', require('./controllers/product'));
app.use('/api', require('./controllers/product_type'));

//startup
if (process.env.NODE_ENV !== 'production') {
    logger.info('Start application');
}

app.listen(port, (err) => {
    if (err) {
        logger.error('Start application error', err);
    }

    logger.info(`Listening on: ${port}`);
});