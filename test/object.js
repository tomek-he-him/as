var test = require('tape');
var asObject = require('../object');

test('map-to/object', function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);

  [ [ asObject(
      [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      ])
    , {a: 'b', c: 'd'}
    , "should do the job for a simple array"
    ]

  , [ asObject([])
    , {}
    , "should return `{}` for an empty array"
    ]

  , [ asObject(
      [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      , {key: 'e', value: [{key: 'f', value: 'g'}]}
      ])
    , {a: 'b', c: 'd', e: [{key: 'f', value: 'g'}]}
    , "should map only one level deep by default"
    ]

  , [ asObject(
      [ {key: 'a', value: 'b'}
      , null
      , {key: 'c', value: 'd'}
      , undefined
      , {}
      , "a string"
      , true
      , {another: 'structure', value: 'anything'}
      , NaN
      , 10
      ])
    , {a: 'b', c: 'd'}
    , "should ignore values which don't match the `{key, value}` structure"
    ]

  ].map(deepEqual);

  tape.end();
  });
