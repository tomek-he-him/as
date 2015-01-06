//
// as/object
// -------------------------------------------------------------------------------------------------
// Maps an array of `{key: "a", value: "b"}` pairs to a new `{a: "b"}` object.
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
export default function asObject (array, options, _depthLeft) {
  var pair, value;

  if (!options) options = {};
  if (_depthLeft === void null && options.depth) _depthLeft = options.depth;

  var result = {};
  var i = 0; var l = array.length; while (i < l) {
    pair = array[i++];
    if (!pair || !pair.hasOwnProperty("key")) continue;

    value = pair.value;
    if (_depthLeft && value instanceof Array) {
      value = asObject(value, options, _depthLeft - 1);
      }
    result[pair.key] = value;
    }

  return result;
  }
