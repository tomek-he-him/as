//
// map-to/object
// -------------------------------------------------------------------------------------------------
// Maps an array of `{key: a, value: b}` pairs to a `{a: b}` object.
/**
 * @param {Object} object – The array of key-value pairs to be mapped.
 * @returns {Array} – A new object mapped from the array.
 */
module.exports = function mapToObject (array) {
  var i, l, pair;
  var result = {};

  i = 0; l = array.length; while (i < l) {
    pair = array[i++];
    if (!pair || !pair.hasOwnProperty('key')) continue;
    result[pair.key] = pair.value;
    }

  return result;
  };
