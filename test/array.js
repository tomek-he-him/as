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
    , "should keep arrays intact"
    ]

  , [ asArray(["f", ["g"]], {depth: Infinity})
    , ["f", ["g"]]
    , "should keep multi-dimentional arrays intact"
    ]

  , [ asArray(["f", "g"], {traverseArrays: true})
    , ["f", "g"]
    , "should keep arrays intact when traversing"
    ]

  , [ asArray(["f", ["g"]], {depth: Infinity, traverseArrays: true})
    , ["f", ["g"]]
    , "should keep multi-dimentional arrays intact when traversing"
    ]

  , [ asArray(["f", {g: "h"}], {depth: Infinity, traverseArrays: true})
    , ["f", [{key: "g", value: "h"}]]
    , "should traverse arrays when told to"
    ]

  , [ asArray(["f", {g: ["h"]}], {depth: Infinity, traverseArrays: true})
    , ["f", {key: "g", value: ["h"]}]
    , "should keep nested arrays intact when traversing"
    ]

  , [ asArray
      ( ["f", {g: [ "h"
                  , {i: "j"}
                  ]}]
      , {depth: Infinity, traverseArrays: true}
      )
    , ["f", {key: "g", value: [ "h"
                              , [{key: "i", value: "j"}]
                              ]}]
    , "should traverse nested arrays when told to"
    ]

  , [ asArray
      ( ["f", {g: ["h", {i: "j"}]}]
      , {depth: 2, traverseArrays: true}
      )
    , ["f", {key: "g", value: ["h", {i: "j"}]}]
    , "should traverse arrays up to the specified depth"
    ]

  ].map(deepEqual);

  tape.end();
  });
