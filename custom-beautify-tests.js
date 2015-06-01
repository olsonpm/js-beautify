//'use strict';
/* --execute=node-- */

var assert = require('assert');
var jsb = require('./beautify.js').js_beautify;
var jsbOrig = require('../../cloned-repos/js-beautify/js/lib/beautify.js').js_beautify;
var ENABLE_LOG = true;

function log(str) {
    if (ENABLE_LOG) {
        console.log(str);
    }
}

//---------//
// Ternary //
//---------//

var ternaryIn = "var a = (b === c)\n ?d\n :e;";
var ternaryExpected = "var a = (b === c)\n    ? d\n    : e;";
test(ternaryIn, ternaryExpected);

ternaryIn = "var a = (b === c)\n ?'d'\n :e;";
ternaryExpected = "var a = (b === c)\n    ? 'd'\n    : e;";
test(ternaryIn, ternaryExpected);

ternaryIn = "var a = (b === c)\n ?{}\n :e;";
ternaryExpected = "var a = (b === c)\n    ? {}\n    : e;";
test(ternaryIn, ternaryExpected);

//---------//
// Boolean //
//---------//

var boolIn = "var a = (b === c)\n && d\n || e;";
var boolExpected = "var a = (b === c)\n    && d\n    || e;";
test(boolIn, boolExpected);


//-------//
// Comma //
//-------//

// array literals
var commaIn = "var a = [\n b\n ,c\n , d\n];";
var commaExpected = "var a = [\n    b\n    , c\n    , d\n];";
test(commaIn, commaExpected);

// object literals
commaIn = "var a = {\n b:'b'\n ,c:'c'\n};";
commaExpected = "var a = {\n    b: 'b'\n    , c: 'c'\n};";
test(commaIn, commaExpected);


//----------------------//
// String Concatenation //
//----------------------//

var strIn = "return b()\n + 'c';";
var strExpected = "return b()\n    + 'c';";
test(strIn, strExpected);


//-----------//
// Functions //
//-----------//

// signature
var fxnIn = "function a(b, c)";
var fxnExpected = "function a(b, c)";
test(fxnIn, fxnExpected);

// calls
fxnIn = "a('b','c');";
fxnExpected = "a('b', 'c');";
test(fxnIn, fxnExpected);

fxnIn = "a('b'\n,'c'\n,d);";
fxnExpected = "a('b'\n    , 'c'\n    , d);";
test(fxnIn, fxnExpected);

fxnIn = "a('b'\n,'c'\n,d\n);";
fxnExpected = "a('b'\n    , 'c'\n    , d\n);";
test(fxnIn, fxnExpected);


//----------//
// Requires //
//----------//

var reqIn = "var a = require('b')\n,c = require('d');";
var reqExpected = "var a = require('b')\n    , c = require('d');";

test(reqIn, reqExpected);


//----------------------//
// Underscore Templates //
//----------------------//

var tempIn = "<% if (a > 5) { %>";
var tempExpected = "<% if (a > 5) { %>";

test(tempIn, tempExpected);


//-------------//
// Helper Fxns //
//-------------//

function visualize(str) {
    return str.replace(/ /g, '.').replace(/\n/g, '\\n');
}

function test(testIn, testExpected, orig) {
    if (!orig) {
        var testOut = jsb(testIn, jshintOpts);
    } else {
        console.log('here');
        var testOut = jsbOrig(testIn, jshintOpts);
    }

    if (testExpected !== testOut) {
        log('expected: ' + visualize(testExpected));
        log('actual:   ' + visualize(testOut));
    }

    assert.strictEqual(testExpected, testOut);
}

var jshintOpts = {
    "node": "true"
    , "multistr": "true"
    , "newcap": "false"
    , "laxcomma": "true"
    , "laxbreak": "true"

    , "globals": {
        "suite": false
        , "test": false
        , "setup": false
    }
}



//---------//
// Success //
//---------//

console.log('Passed');
