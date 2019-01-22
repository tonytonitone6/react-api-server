const root = require('app-root-path').path;
const { transports, format, createLogger } = require('winston');
const { join } = require('path');


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
    new transports.File({ filename: join(`${root}/logs`, 'error.log'), level: 'error'}),
    new transports.File({ filename: join(`${root}/logs`, 'mongo.log') }),
    new transports.Console()
  ]
});

module.exports = logger;