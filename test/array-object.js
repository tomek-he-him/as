var test = require("tape");
var asObject = require("../object");
var asArray = require("../array");

test("as/array » as/object", function (tape) {
  var deepEqual = Function.prototype.apply.bind(tape.deepEqual, null);


  // // Basic functionality
  // // -----------------------------------------------------------------------------------------------

  // [ [ asObject(asArray({a: "b", c: "d"}))
  //   , "should do the job for a simple array"
  //   ]

  // , [ asObject(asArray({}))
  //   , "should return `[]` for an empty object"
  //   ]

  // , [ asObject(asArray(
  //     { a: null
  //     , b: 0
  //     , c: true
  //     , d: false
  //     , e: undefined
  //     , f: "string"
  //     , g: ""
  //     , h: ["array"]
  //     }))
  //   , "should work for various data types"
  //   ]

  // ].map(deepEqual);

  tape.end();
  });
