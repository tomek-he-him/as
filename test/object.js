var test = require("tape");
var asObject = require("../object");

test("map-to/object", function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);


  // Basic functionality
  // -----------------------------------------------------------------------------------------------

  [ [ asObject(
      [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      ])
    , {a: "b", c: "d"}
    , "should do the job for a simple array"
    ]

  , [ asObject([])
    , {}
    , "should return `{}` for an empty array"
    ]

  , [ asObject(
      [ {key: "a", value: null}
      , {key: "b", value: 0}
      , {key: "c", value: true}
      , {key: "d", value: false}
      , {key: "e", value: undefined}
      , {key: "f", value: "string"}
      , {key: "g", value: ""}
      , {key: "h", value: ["array"]}
      ])
    , { a: null
      , b: 0
      , c: true
      , d: false
      , e: undefined
      , f: "string"
      , g: ""
      , h: ["array"]
      }
    , "should work for various data types"
    ]

  , [ asObject(
      [ {key: "a", value: "b"}
      , null
      , {key: "c", value: "d"}
      , undefined
      , {}
      , "a string"
      , true
      , {another: "structure", value: "anything"}
      , NaN
      , 10
      ])
    , {a: "b", c: "d"}
    , "should ignore values which don't match the `{key, value}` structure"
    ]


  // `options.depth`
  // -----------------------------------------------------------------------------------------------

  , [ asObject(
      [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: [{key: "f", value: "g"}]}
      ])
    , {a: "b", c: "d", e: [{key: "f", value: "g"}]}
    , "should map shallowly by default"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: "d"}
        , {key: "e", value: [{key: "f", value: "g"}]}
        ]
      , {depth: 1}
      )
    , {a: "b", c: "d", e: {f: "g"}}
    , "should map one level deep"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: "d"}
        , {key: "e", value: [ {key: "f", value: "g"}
                            , {key: "h", value: [{key: "i", value: "j"}]}
                            ]}
        ]
      , {depth: 1}
      )
    , {a: "b", c: "d", e: {f: "g", h: [{key: "i", value: "j"}]}}
    , "should map only one level deep"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: "d"}
        , {key: "e", value: [ {key: "f", value: "g"}
                            , {key: "h", value: [{key: "i", value: "j"}]}
                            ]}
        ]
      , {depth: Infinity}
      )
    , {a: "b", c: "d", e: {f: "g", h: {i: "j"}}}
    , "should map deeply"
    ]

  ].map(deepEqual);

  tape.end();
  });
