//
// as/array
// -------------------------------------------------------------------------------------------------
// Maps an `{a: "b"}` object to a new array of `{key: "a", value: "b"}` pairs.
//
/**
 * @function asArray
 *
 * @param {Object} object
 *    The object to be mapped.
 *
 * @param {Object} [options]
 * - {Number} [depth=1]
 *    The depth to which the `object`'s tree should be mapped. Set it to `Infinity` to map the
 *    entire tree structure.
 *
 * @returns {Array}
 *    A new array of key-value pairs mapped from the object.
 */
export default function asArray (object, options) {
  // Parse options.
  var depth =
    ( !options || typeof options == "undefined"
    ? 1
    : options.depth
    );

  // End recursion if we've reached a depth of 0.
  if (!depth) return object;

  // Create an empty `result` array.
  var result = [];
  // For every `key` of the given `object`:
  for (let key in object) if (object.hasOwnProperty(key)) {  // Can't use iterator because of https://6to5.org/docs/usage/caveats/
    let value = object[key];
    // - recurse if the value is an object
    if (typeof value == "object" && value !== null) {
      value = asArray(value, {depth: depth - 1});
      }
    // - append {key: `key`, value: `object[key]`} to `result`
    result.push({key: key, value: value});
    }

  // Return the `result`.
  return result;
  }
