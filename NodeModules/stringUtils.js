const ENABLE_PRINTS = true;

var arrayUtils = require("./arrayUtils");

function isString(string) {
    var isItString = false;
    if ((typeof string === 'string') ||
        (string instanceof String)) {
        isItString = true;
    }
    return isItString;
}

// Given a string, capitalize the first letter and lowercase the remaining characters
exports.capitalize = function (string) {
    try {
        if (string === undefined) {
            throw "Required input \'string\' undefined";
        }
        if (false == isString(string)) {
            throw "Input should be string type";
        }

        if (ENABLE_PRINTS) {
            var str = "capitalize(" + string + ") returned ";
        }

        var newString = string.charAt(0).toUpperCase();
        newString += string.toLowerCase().slice(1);

        if (ENABLE_PRINTS) {
            str += newString;
            console.log(str);
        }

        return newString;
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: " + string + "]";
        }
        console.log("ERROR: capitalize() - " + err);
    }
}

function isNumberic(num) {
    return !isNaN(num);
}

exports.repeat = function (string, num) {
    try {
        if ((string === undefined) ||
            (num === undefined)) {
            throw "Required inputs string and/or num undefined";
        }
        if (false == isString(string)) {
            throw "Required input \'string\' should be of type string";
        }
        if (isNaN(num)) {
            throw "Required input \'num\' should be of type integer";
        }
        var repeatStr = "";
        var numInt = parseInt(num);
        if ((isNumberic(num)) &&
            (numInt > 0)) {
            for (let i = 0; i < numInt; i++) {
                repeatStr += string;
            }
        }

        if (ENABLE_PRINTS) {
            var str = "repeat(" + string + ") returned " + repeatStr;
            console.log(str);
        }
        return repeatStr;
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: " + string + "," + num + "]";
        }
        console.log("ERROR: repeat() - " + err);
    }
}

exports.countChars = function (string) {
    try {
        if (string === undefined) {
            throw "Required input \'string\' undefined";
        }
        if (false == isString(string)) {
            throw "Required input \'string\' should be of type string";
        }
        var charArray = string.split("");
        var countObj = arrayUtils.countElements(charArray);
        var countObjOrdered = {};
        Object.keys(countObj).sort().forEach(function(key) {
            countObjOrdered[key] = countObj[key];
        });
        if (ENABLE_PRINTS) {
            var str = "countChars(" + string + ") returned " + JSON.stringify(countObjOrdered);
            console.log(str);
        }
        return countObjOrdered;
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: " + string + "]";
        }
        console.log("ERROR: countChars() - " + err);
    }
}