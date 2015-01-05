//
// map-to/array
// -------------------------------------------------------------------------------------------------
// Maps a `{a: b}` object to an array of `{key: a, value: b}` pairs.
/**
 * @param {Object} object – The object to be mapped
 * @returns {Array} – A new array of key-value pairs mapped from the object
 */
module.exports = function asArray (object) {
  var key;
  var result = [];

  for (key in object) if (object.hasOwnProperty(key)) {
    result.push({key: key, value: object[key]});
    }

  return result;
  };
