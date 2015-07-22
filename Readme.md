[![Build status
](https://img.shields.io/travis/tomekwi/as/master.svg?style=flat-square)
](https://travis-ci.org/tomekwi/as)
 [![Coveralls
](https://img.shields.io/coveralls/tomekwi/as.svg?style=flat-square)
](https://coveralls.io/r/tomekwi/as)
 [![Code climate
](https://img.shields.io/codeclimate/github/tomekwi/as.svg?style=flat-square)
](https://codeclimate.com/github/tomekwi/as)
 [![David DM
](https://img.shields.io/david/tomekwi/as.svg?style=flat-square)
](http://david-dm.org/tomekwi/as)

as
===

**`as/array` and `as/object`. Convert easily, back and forth.**

- Brings all functional goodness of arrays to objects.
- Brings the flexibility of objects to arrays.
- Works great with [1-liners][], [101][] and other functional programming libraries.


[101]: https://github.com/tjmehta/101 "tjmehta/101"
[1-liners]: https://github.com/stoeffel/1-liners "stoeffel/1-liners"




Installation
------------

```sh
$ npm install as
```




Usage
-----

```js
var asArray = require("as/array");
var asObject = require("as/object");
```


### as/array

```js
asArray(
  {a: 1, b: 2}
  );
// [ {key: "a", value: 1}
// , {key: "b", value: 2}
// ]
```


### as/object

```js
asObject(
  [ {key: "a", value: 1}
  , {key: "b", value: 2}
  ]);
// {a: 1, b: 2}
```




License
-------

[MIT][] © [Tomek Wiszniewski][].


[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
