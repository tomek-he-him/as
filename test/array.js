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
    , "should map shallowly by default"
    ]

  , [ asArray({a: 'b', c: 'd', e: {f: 'g'}}, {depth: 1})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      , {key: 'e', value: [ {key: 'f', value: 'g'}
                          ]}
      ]
    , "should map one level deep"
    ]

  , [ asArray({a: 'b', c: 'd', e: {f: 'g', h: {i: 'j'}}}, {depth: 1})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      , {key: 'e', value: [ {key: 'f', value: 'g'}
                          , {key: 'i', value: {i: 'j'}}
                          ]}
      ]
    , "should map only one level deep"
    ]

  , [ asArray({a: 'b', c: 'd', e: {f: 'g', h: {i: 'j'}}}, {depth: 1})
    , [ {key: 'a', value: 'b'}
      , {key: 'c', value: 'd'}
      , {key: 'e', value: [ {key: 'f', value: 'g'}
                          , {key: 'i', value: [{key: 'i', value: 'j'}]}
                          ]}
      ]
    , "should map deeply"
    ]

  ].map(deepEqual);

  tape.end();
  });
