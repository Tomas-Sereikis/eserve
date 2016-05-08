const winston = require('winston');
const colors = require('colors');
const dateFormat = require('dateformat');

const colorize = true;
const transport = new winston.transports.Console({ colorize, timestamp });
const logger = new winston.Logger({ transports: [ transport ] });
const stream = { write };
const empty = emptyLogger();

module.exports = Object.assign(logger, { stream, empty });

/**
 * Write message to logger
 * @param {string} message
 */
function write(message) {
  logger.info(message.trim());
}

/**
 * Logger timestamp
 * @returns {string}
 */
function timestamp() {
  return `[${colors.magenta(dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss.l'))}]`;
}

/**
 * Empty logger
 * @returns {Object}
 */
function emptyLogger() {
  const noop = () => undefined;
  return { log: noop,debug: noop, info: noop, warn: noop, error: noop, fatal: noop };
}
