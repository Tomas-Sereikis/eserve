module.exports = casing;

/**
 * @param {Function} caseFn
 * @param value
 * @param [defaults]
 * @returns {*}
 */
function casing(caseFn, value, defaults) {
  return caseFn(value) ? value : defaults;
}
