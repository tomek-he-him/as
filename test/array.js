var test = require("tape");
var asArray = require("../array");

test("map-to/array", function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);


  // Basic functionality
  // -----------------------------------------------------------------------------------------------

  [ [ asArray({a: "b", c: "d"})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      ]
    , "should do the job for a simple array"
    ]

  , [ asArray({})
    , []
    , "should return `[]` for an empty object"
    ]

  , [ asArray(
      { a: null
      , b: 0
      , c: true
      , d: false
      , e: undefined
      , f: "string"
      , g: ""
      , h: ["array"]
      })
    , [ {key: "a", value: null}
      , {key: "b", value: 0}
      , {key: "c", value: true}
      , {key: "d", value: false}
      , {key: "e", value: undefined}
      , {key: "f", value: "string"}
      , {key: "g", value: ""}
      , {key: "h", value: ["array"]}
      ]
    , "should work for various data types"
    ]


  // `options.depth`
  // -----------------------------------------------------------------------------------------------

  , [ asArray({a: "b", c: "d", e: {f: "g"}})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: {f: "g"}}
      ]
    , "should map shallowly by default"
    ]

  , [ asArray({a: "b", c: "d", e: {f: "g"}}, {depth: 1})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: [ {key: "f", value: "g"}
                          ]}
      ]
    , "should map one level deep"
    ]

  , [ asArray({a: "b", c: "d", e: {f: "g", h: {i: "j"}}}, {depth: 1})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: [ {key: "f", value: "g"}
                          , {key: "h", value: {i: "j"}}
                          ]}
      ]
    , "should map only one level deep"
    ]

  , [ asArray({a: "b", c: "d", e: {f: "g", h: {i: "j"}}}, {depth: Infinity})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: [ {key: "f", value: "g"}
                          , {key: "h", value: [{key: "i", value: "j"}]}
                          ]}
      ]
    , "should map deeply"
    ]


  // `options.traverseArrays`
  // -----------------------------------------------------------------------------------------------

  , [ asArray(["f", "g"])
    , ["f", "g"]
    , "should keep arrays intact by default"
    ]

  , [ asArray(["f", "g"], {traverseArrays: true})
    , [ {key: "0", value: "f"}
      , {key: "1", value: "g"}
      ]
    , "should traverse arrays when told to"
    ]

  , [ asArray({a: "b", c: "d", e: ["f", "g"]}, {depth: Infinity})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: ["f", "g"]}
      ]
    , "should keep nested arrays intact by default"
    ]

  , [ asArray({a: "b", c: "d", e: ["f", "g", ["h"]]}, {traverseArrays: true, depth: Infinity})
    , [ {key: "a", value: "b"}
      , {key: "c", value: "d"}
      , {key: "e", value: [ {key: "0", value: "f"}
                          , {key: "1", value: "g"}
                          , {key: "2", value: [{key: "0", value: "h"}]}
                          ]}
      ]
    , "should traverse nested arrays when told to"
    ]

  ].map(deepEqual);

  tape.end();
  });
