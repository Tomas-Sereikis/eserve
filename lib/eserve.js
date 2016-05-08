const url = require('url');
const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy-middleware');
const serveStatic = require('serve-static');
const isDefined = require('defined');
const isObject = require('is-object');
const casing = require('./util/casing');
const protocol = require('./util/protocol');
const logger = require('./util/logger');
const morgan = require('morgan');

const app = express();

/**
 * Default morgan logger format
 * @type {string}
 */
var loggerFormat = 'short';

module.exports = {
  start,
  proxy,
  statics,
  logFormat
};

/**
 * Start server
 * @param {number} port
 * @param {string} host
 */
function start(port, host) {
  app.listen(port, host, onServerStarted(port));
}

/**
 * Logger format
 * @see https://github.com/expressjs/morgan#predefined-formats
 * @param {string} format
 */
function logFormat(format) {
  loggerFormat = format;
}

/**
 * Serve static files path
 * @param {string} filesPath
 */
function statics(filesPath) {
  const realPath = path.resolve(process.cwd(), filesPath);
  app.use(morgan(loggerFormat, logger));
  app.use(serveStatic(realPath));
}

/**
 * @param {string} original
 * @param {string} proxied
 * @param {Object} [optional]
 */
function proxy(original, proxied, optional) {
  // make sure that options is object
  optional = casing(isObject, optional, {});

  const parsed = url.parse(proxied);
  const options = {};

  options.target = `${parsed.protocol}//${parsed.host}`;
  options.changeOrigin = casing(isDefined, optional.changeOrigin, true);
  options.pathRewrite = pathRewrite(original, parsed.path);
  options.ws = casing(protocol.isWebSocket, parsed.protocol);
  options.logProvider = () => logger.empty;

  // create proxy
  app.use(original, httpProxy(options));
}

/**
 * @param {string} original
 * @param {string} rewrite
 * @returns {Function}
 */
function pathRewrite(original, rewrite) {
  return function run(reqPath) {
    return reqPath.replace(new RegExp(`^${original}`), rewrite);
  };
}

/**
 * On server started
 * @returns {Function}
 */
function onServerStarted(port) {
  return function run() {
    logger.info(`Server started at port ${port}`);
  };
}
