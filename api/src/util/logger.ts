import { Logger, LoggerOptions, transports } from 'winston';


// Esse arquivo é responsável por inicializar os logs da aplicação.

const options: LoggerOptions = {
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
        }),
        new transports.File({ filename: 'debug.log', level: 'debug' })
    ]
};

const logger = new Logger(options);

if (process.env.NODE_ENV !== 'production') {
    logger.debug('Logging initialized at debug level');
}

export default logger;
