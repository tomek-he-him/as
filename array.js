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
 *    The depth to which the `object` tree should be mapped. Set it to `Infinity` to map the whole
 *    object's structure.
 *
 * - {Boolean} [keepArrays=true]
 *    If set to false, arrays will be traversed like pure objects. `[true]` will be mapped to
 *    `[{key: "0", value: true}, {key: "length", value: 1}]`.
 *
 * @returns {Array}
 *    A new array of key-value pairs mapped from the object.
 */
module.exports = function asArray (object) {
  var key;
  var result = [];

  for (key in object) if (object.hasOwnProperty(key)) {
    result.push({key: key, value: object[key]});
    }

  return result;
  };
