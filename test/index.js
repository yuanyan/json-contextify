var jsonContextify = require('../');

var rawJson = {
    foo: '{{bar}}',
    bar: ['{{baz}}'],
    baz: 'hi'
}
// default is mustache
console.log(jsonContextify(rawJson)) // => { foo: [ 'hi' ], bar: [ 'hi' ], baz: 'hi' }


var rawJson = {
    foo: '<%=bar%>',
    bar: ['<%=baz%>'],
    baz: 'hi'
}
// default is mustache
console.log(jsonContextify(rawJson, 'erb')) // => { foo: [ 'hi' ], bar: [ 'hi' ], baz: 'hi' }


var rawJson = {
    foo: '${bar}',
    bar: ['${baz}/${zoo}'],
    baz: 'hi',
    zoo: 'wo'
}
// default is mustache
console.log(jsonContextify(rawJson, 'es')) // => { foo: [ 'hi' ], bar: [ 'hi' ], baz: 'hi' }