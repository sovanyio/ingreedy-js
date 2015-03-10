# Ingreedy-js Extended
This is a fork of [iancanderson/ingreedy-js](https://github.com/iancanderson/ingreedy-js) with support for a multiplier.  Currently not outputting a completely clean ingredient when there are extra words within parenthesis, but parses the data correctly.

* 2 28oz cans of tomatoes
* 2 (8 oz) filet mignon
* (2) sirloin steaks

# Usage

```javascript
var result = Ingreedy.parse('2 (1 lb bags) potatoes');
result.amount
  //=> '2'
result.container
  //=> {
  //   amount: '1',
  //   unit: 'lb'
  // }
result.ingredient
  //=> "bags) potatoes"
```

# Pieces of Flair
- [![Build
  Status](https://secure.travis-ci.org/sovanyio/ingreedy-js.png?branch=master)](http://travis-ci.org/sovanyio/ingreedy-js)
