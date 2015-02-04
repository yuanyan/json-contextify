# JSON Contextify

### Install

```
npm install json-contextify
```

### Sample

```
var jsonContextify = require('json-contextify');
var rawJson = {
    foo: '{{bar}}',
    bar: ['{{baz}}'],
    baz: 'hi'
}
jsonContextify(rawJson) // => { foo: [ 'hi' ], bar: [ 'hi' ], baz: 'hi' }

```
