const ENABLE_PRINTS = true;

function isObject(obj) {
    if (obj === null) { return false;}
    return ( (typeof obj === 'function') || (typeof obj === 'object') );
    //return obj === Object(obj);
}

function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

exports.extend = function (...args) {
    try {
        var inputAsStr = "";
        for (var i = 0; i < args.length; i++) {
            inputAsStr += JSON.stringify(args[i]) + ",";
        }
        if (args === undefined) {
            throw "Must specify Objects as parameters";
        }
        var newObj = {};
        for (var i = args.length - 1; i >= 0; i--) {
            if ("object" !== toType(args[i])) {
                throw "Paramater " + i + " is not Object type";
            }
            Object.keys(args[i]).forEach(function (key) {
                newObj[key] = args[i][key];
            });
        }
        if (ENABLE_PRINTS) {
            var str = "extend(" + inputAsStr + ") returned " + JSON.stringify(newObj);
            console.log(str);
        }
        return newObj;
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: " + inputAsStr + "]";
        }
        console.log("ERROR: extend() - " + err);
    }
}

exports.smush = function (...args) {
    try {
        var inputAsStr = "";
        for (var i = 0; i < args.length; i++) {
            inputAsStr += JSON.stringify(args[i]) + ",";
        }
        if (args === undefined) {
            throw "Must specify Objects as parameters";
        }
        var newObj = {};
        for (var i = 0; i < args.length; i++) {
            if ("object" !== toType(args[i])) {
                throw "Paramater " + i + " is not Object type";
            }
            Object.keys(args[i]).forEach(function (key) {
                newObj[key] = args[i][key];
            });
        }
        if (ENABLE_PRINTS) {
            var str = "smush(" + inputAsStr + ") returned " + JSON.stringify(newObj);
            console.log(str);
        }
        return newObj;
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: " + inputAsStr + "]";
        }
        console.log("ERROR: smush() - " + err);
    }
}

exports.mapValues = function (object, func) {
    try {
        if ((object === undefined) ||
            (func === undefined)) {
            throw "Inputs object and/or func undefined";
        }
        if ("object" !== toType(object)) {
            throw "Input \'object\' should be object type";
        }
        if ("function" !== toType(func)) {
            throw "Input \'func\' should be function type";
        }

        var newObj = {};
        Object.keys(object).forEach (function (key) {
            newObj[key] = func(object[key]);
        });

        if (ENABLE_PRINTS) {
            var str = "mapValues(" + JSON.stringify(object) + ") returned " + JSON.stringify(newObj);
            console.log(str);
        }
        return newObj;
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: " + JSON.stringify(object) + "]";
        }
    console.log("ERROR: mapValues() - " + err);
    }
}