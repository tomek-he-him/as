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
      , {key: "c", value: [{key: "d", value: "e"}]}
      ])
    , {a: "b", c: [{key: "d", value: "e"}]}
    , "should map shallowly by default"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: [{key: "d", value: "e"}]}
        ]
      , {depth: 1}
      )
    , {a: "b", c: {d: "e"}}
    , "should map one level deep"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: [ {key: "d", value: "e"}
                            , {key: "f", value: [{key: "g", value: "h"}]}
                            ]}
        ]
      , {depth: 1}
      )
    , {a: "b", c: {d: "e", f: [{key: "g", value: "h"}]}}
    , "should map only one level deep"
    ]

  , [ asObject
      ( [ {key: "a", value: "b"}
        , {key: "c", value: [ {key: "d", value: "e"}
                            , {key: "f", value: [{key: "g", value: "h"}]}
                            ]}
        ]
      , {depth: Infinity}
      )
    , {a: "b", c: {d: "e", f: {g: "h"}}}
    , "should map deeply"
    ]


  // `options.traverseArrays`
  // -----------------------------------------------------------------------------------------------

  , [ asObject(
      [ {key: "a", value: ["array"]}
      ])
    , { a: ["array"]
      }
    , "should keep arrays intact"
    ]

  , [ asObject
      ( [ {key: "a", value: ["array"]}
        ]
      , {depth: Infinity}
      )
    , { a: ["array"]
      }
    , "should keep arrays intact when mapping deeply"
    ]

  , [ asObject
      ( [ {key: "a", value: ["array"]}
        ]
      , {depth: Infinity, traverseArrays: true}
      )
    , { a: ["array"]
      }
    , "should keep arrays intact when traversing"
    ]

  , [ asObject
      ( [ {key: "a", value: [{key: "b", value: ["array"]}]}
        ]
      , {depth: Infinity, traverseArrays: true}
      )
    , {a: {b: ["array"]}}
    , "should keep nested arrays intact when traversing"
    ]

  , [ asObject
      ( [ "array"
        , [{key: "c", value: "d"}]
        ]
      , {depth: Infinity, traverseArrays: true}
      )
    , ["array", {c: "d"}]
    , "should traverse arrays"
    ]

  , [ asObject
      ( [ {key: "a"}
        , "b"
        ]
      , {depth: Infinity, traverseArrays: true}
      )
    , {"0": "b", a: undefined}
    , "should recognize an array when traversing"
    ]

  , [ asObject
      ( [ {key: "a"}
        , "b"
        ]
      , {depth: Infinity, traverseArrays: true}
      ) instanceof Array
    , true
    , "should return an array when recognized an array"
    ]

  , [ asObject
      ( [ {key: "b", value: [ "array"
                            , [{key: "c", value: "d"}]
                            ]}
        ]
      , {depth: Infinity, traverseArrays: true}
      )
    , {b: ["array", {c: "d"}]}
    , "should traverse nested arrays"
    ]

  , [ asObject
      ( [ [ "array"
          , [ {key: "a", value: "b"}
            , {key: "c", value: ["d", [{key: "e", value: "f"}]]}
            ]
          ]
        ]
      , {depth: Infinity, traverseArrays: true}
      )
    , ["array", {a: "b", c: ["d", {e: "f"}]}]
    , "should traverse arrays deeply"
    ]

  , [ asObject
      ( [ [ "array"
          , [ {key: "a", value: "b"}
            , {key: "c", value: ["d", [{key: "e", value: "f"}]]}
            ]
          ]
        ]
      , {depth: 2, traverseArrays: true}
      )
    , ["array", {a: "b", c: ["d", [{key: "e", value: "f"}]]}]
    , "should traverse arrays up to the specified depth"
    ]

  ].map(deepEqual);

  tape.end();
  });
