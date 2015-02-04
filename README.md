# JSON Contextify

### Install

```
npm install json-contextify
```

### Sample

1. Mustache

```
var jsonContextify = require('json-contextify');
var rawJson = {
    foo: '{{bar}}',
    bar: ['{{baz}} {{zoo}}'],
    baz: 'hi',
    zoo: 'json'
}
// default is mustache
jsonContextify(rawJson) // => { foo: [ 'hi json' ], bar: [ 'hi json' ], baz: 'hi' }

```

2. ERB

```
var jsonContextify = require('json-contextify');
var rawJson = {
    foo: '<%=bar%>',
    bar: ['<%=baz%>'],
    baz: 'hi'
}
jsonContextify(rawJson, 'erb') // => { foo: [ 'hi' ], bar: [ 'hi' ], baz: 'hi' }

```

3. ES

```
var jsonContextify = require('json-contextify');
var rawJson = {
    foo: '${bar}',
    bar: ['${baz}'],
    baz: 'hi'
}
jsonContextify(rawJson, 'es') // => { foo: [ 'hi' ], bar: [ 'hi' ], baz: 'hi' }

```