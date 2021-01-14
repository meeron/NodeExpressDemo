import winston from 'winston';
const { combine, splat, simple } = winston.format;

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'debug',
            transports: [],
        });
        this.logger.add(new winston.transports.Console({
            format: combine(
                splat(),
                simple(),
            ),
        }));
    }
    
    info(message, meta) {
        this.logger.info(message, meta);
    }
    
    debug(message, meta) {
        this.logger.debug(message, meta);
    }
    
    warn(message, meta) {
        this.logger.warn(message, meta);
    }

    error(message, meta) {
        this.logger.error(message, meta);
    }
}

const logger = new Logger();

export default logger;