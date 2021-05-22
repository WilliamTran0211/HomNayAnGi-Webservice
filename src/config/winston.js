const { createLogger, transports, format, addColors, combine } = require('winston');
const path = require('path');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

addColors(colors);

const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const logger = createLogger({
    level: level(),
    transports: [
        new transports.File({
            filename: './logs/combined.log',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
                format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
            json: false,
            maxsize: 5242880
        }),
        new transports.Console({
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
                format.colorize({ all: true }),
                format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        })
    ]
});

module.exports = logger;
