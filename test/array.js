var test = require('tape');
var asArray = require('../array');

test('map-to/array', function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);

  [ [ asArray({a: 'b', c: 'd'})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      ]
    , "should do the job for a simple array"
    ]

  , [ asArray({})
    , []
    , "should return `[]` for an empty object"
    ]

  , [ asArray({a: 'b', c: 'd', e: {f: 'g'}})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      , {key: 'e', value: {f: 'g'}}
      ]
    , "should map only one level deep by default"
    ]

  ].map(deepEqual);

  tape.end();
  });
