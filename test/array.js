var test = require('tape');
var mapToArray = require('../array');

test('map-to/array', function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);

  [ [ mapToArray({})
    , []
    ]

  , [ mapToArray({a: 'b', c: 'd'})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      ]
    ]

  , [ mapToArray({a: 'b', c: 'd', e: {f: 'g'}})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      , {key: 'e', value: {f: 'g'}}
      ]
    ]

  ].map(deepEqual);

  tape.end();
  });
