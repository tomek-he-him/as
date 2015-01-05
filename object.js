//
// as/object
// -------------------------------------------------------------------------------------------------
// Maps an array of `{key: a, value: b}` pairs to a new `{a: b}` object.
//
/**
 * @function asObject
 *
 * @param {Array} array
 *    The array of key-value pairs to be mapped.
 *
 * @param {Object} [options]
 * - {Number} [depth=0]
 *    The depth to which the `array`'s pairs should be traversed. Set it to `Infinity` to map the
 *    whole structure.
 *
 * @returns {Object}
 *    A new object mapped from the array.
 */
module.exports = function asObject (array) {
  var i, l, pair;
  var result = {};

  i = 0; l = array.length; while (i < l) {
    pair = array[i++];
    if (!pair || !pair.hasOwnProperty('key')) continue;
    result[pair.key] = pair.value;
    }

  return result;
  };
