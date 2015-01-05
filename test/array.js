var test = require('tape');
var asArray = require('../array');

test('map-to/array', function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);

  [ [ asArray({})
    , []
    ]

  , [ asArray({a: 'b', c: 'd'})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      ]
    ]

  , [ asArray({a: 'b', c: 'd', e: {f: 'g'}})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      , {key: 'e', value: {f: 'g'}}
      ]
    ]

  ].map(deepEqual);

  tape.end();
  });
