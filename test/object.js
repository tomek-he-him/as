var test = require('tape');
var mapToObject = require('../object');

test('map-to/object', function (tape) {
    var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);

    [ [ mapToObject([])
      , {}
      ]

    , [ mapToObject(
            [ {key: 'a', value: 'b'}
            , {key: 'c', value: 'd'}
            ])
      , {a: 'b', c: 'd'}
      ]

    , [ mapToObject(
            [ {key: 'a', value: 'b'}
            , {key: 'c', value: 'd'}
            , {key: 'e', value: {f: 'g'}}
            ])
      , {a: 'b', c: 'd', e: {f: 'g'}}
      ]

    ].map(deepEqual);

    tape.end();
    });
