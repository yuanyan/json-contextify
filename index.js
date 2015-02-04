module.exports = function processTemplate(raw, style){
    return walk(raw, function(value) {
        // TODO: if processed vlaue is null or undefined, print warn
        return getProperty(value, raw, style);
    });
}

// Config template Regexp.
var styles = module.exports.styles = {
    'mustache': /{{\s*([a-z0-9_$]+(?:\.[a-z0-9_$]+)*)\s*}}/i,
    'es': /\${\s*([a-z0-9_$]+(?:\.[a-z0-9_$]+)*)\s*}/i,
    'erb': /<%=\s*([a-z0-9_$]+(?:\.[a-z0-9_$]+)*)\s*%>/i
};


// Split strings on dot, but only if dot isn't preceded by a backslash. Since
// JavaScript doesn't support lookbehinds, use a placeholder for "\.", split
// on dot, then replace the placeholder character with a dot.
function getParts(str) {
    return str.replace(/\\\./g, '\uffff').split('.').map(function(s) {
        return s.replace(/\uffff/g, '.');
    });
}

/**
 * Get the value of a deeply-nested property exist in an object.
 * @method utils.namespace(obj, parts, create)
 * @param obj
 * @param parts
 * @param create
 * @returns {*}
 */
function namespace(obj, parts, create) {
    if (typeof parts === 'string') {
        parts = getParts(parts);
    }

    var part;
    while (typeof obj === 'object' && obj && parts.length) {
        part = parts.shift();
        if (!(part in obj) && create) {
            obj[part] = {};
        }
        obj = obj[part];
    }

    return obj;
};

/**
 * Recurse through objects and arrays, executing fn for each non-object.
 * @method utils.walk(value, fn, fnContinue)
 * @param value
 * @param fn
 * @param fnContinue
 * @returns {*}
 */
function walk(value, fn, fnContinue) {
    var obj;
    if (fnContinue && fnContinue(value) === false) {
        // Skip value if necessary.
        return value;
    } else if (Array.isArray(value)) {
        // If value is an array, recurse.
        return value.map(function (value) {
            return walk(value, fn, fnContinue);
        });
    } else if (typeof value == 'object') {
        // If value is an object, recurse.
        obj = {};
        Object.keys(value).forEach(function (key) {
            obj[key] = walk(value[key], fn, fnContinue);
        });
        return obj;
    } else {
        // Otherwise pass value into fn and return.
        return fn(value);
    }
};

// Get config data, recursively processing templates.
function getProperty(value, data, style) {
    style = style || 'mustache';
    var propStringTmplRe = styles[style.toLowerCase()];

    // process string value
    if (typeof value == 'string') {

        var matches = value.match(propStringTmplRe);
        if (matches) {
            var propName = matches[1];
            var template = matches[0];
            // Get raw, unprocessed config data.
            var rawValue = namespace(data, propName);
            var result = getProperty(rawValue, data, style);

            if(typeof result == 'string'){
                var newValue = value.replace(template, result);
                var newMatches = newValue.match(propStringTmplRe);
                if (newMatches){
                    return getProperty(newValue, data, style)
                }else
                    return newValue;
            }else
                return result;
        }

        // process array value
    } else if (Array.isArray(value)) {
        return value.map(function(val){
            return getProperty(val, data, style)
        });
    }

    return value;
}
