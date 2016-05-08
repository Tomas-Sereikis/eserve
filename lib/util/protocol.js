exports.isWebSocket = isWebSocket;

/**
 * Returns if is a websocket protocol
 * @param {string} protocol
 * @returns {boolean}
 */
function isWebSocket(protocol) {
  return protocol === 'ws:';
}
