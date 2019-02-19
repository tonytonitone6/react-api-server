import {
  transports,
  format,
  createLogger
} from 'winston';
import * as path from 'path';

const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  },
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.colorize(),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: path.join(`${__dirname}/logs`, 'error.log'), level: 'error'}),
    new transports.File({ filename: path.join(`${__dirname}/logs`, 'mongo.log') }),
    new transports.Console()
  ]
});

export default logger;