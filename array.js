//
// as/array
// -------------------------------------------------------------------------------------------------
// Maps an `{a: b}` object to a new array of `{key: a, value: b}` pairs.
//
/**
 * @function asArray
 *
 * @param {Object} object
 *    The object to be mapped.
 *
 * @param {Object} [options]
 * - {Number} [depth=0]
 *    The depth to which the `object`'s tree should be mapped. Set it to `Infinity` to map the
 *    entire tree structure.
 *
 * - {Boolean} [traverseArrays=false]
 *    If set to `true`, arrays will be traversed like pure objects. `[true]` will be mapped to
 *    `[{key: "0", value: true}]`.
 *
 * @returns {Array}
 *    A new array of key-value pairs mapped from the object.
 */
module.exports = function asArray (object, options, _depthLeft) {
  var key, value;

  if (!options) options = {};
  var traverseArrays = options.traverseArrays || false;
  if (_depthLeft === void null && options.depth) _depthLeft = options.depth;

  if (!traverseArrays && object instanceof Array) return object.slice();

  var result = [];
  for (key in object) if (object.hasOwnProperty(key)) {
    value = object[key];
    if (  _depthLeft
       && value !== null && typeof value == "object"
       ) {
      value = asArray(value, options, _depthLeft - 1);
      }
    result.push({key: key, value: value});
    }

  return result;
  };
