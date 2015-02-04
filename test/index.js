var contextify = require('../');

var json = {
    foo: '{{bar}}',
    bar: ['{{baz}}'],
    baz: 'hi'
}

console.log(contextify(json));
