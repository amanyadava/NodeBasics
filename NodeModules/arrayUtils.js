const ENABLE_PRINTS = 1;

exports.head = function (array) {
    try {
        if (Array.isArray(array)) {
            if (array.length > 1) {
                if (ENABLE_PRINTS) {
                    var str = "head([" + array + "]) returned " + array[0];
                    console.log(str);
                }
                return array[0];
            }
            else {
                throw "head(): EMPTY array";
            }
        }
        else {
            throw "head(): NOT array";
        }
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: [" + array + "]]";
        }
        console.log("ERROR: " + err);
    }
}

exports.last = function (array) {
    try {
        if (Array.isArray(array)) {
            if (array.length > 1) {
                if (ENABLE_PRINTS) {
                    var str = "last([" + array + "]) returned " + array[array.length - 1];
                    console.log(str);
                }
                return array[array.length - 1];
            }
            else {
                throw "last(): EMPTY array";
            }
        }
        else {
            throw "last(): NOT array";
        }
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: [" + array + "]]";
        }
        console.log("ERROR: " + err);
    }
}

//Removes the element at the specified index of the array, and returns the NEW array
exports.remove = function (array, index) {
    try {
        if ((array === undefined) ||
            (index == undefined)) {
            throw "remove(): Input array or index undefined"
        }

        if (Array.isArray(array)) {
            if (index >= 0) {
                if (index < array.length) {
                    var leftArray = array.slice(0, index);
                    var rightArray = array.slice(index + 1);
                    if (ENABLE_PRINTS) {
                        var str = "remove([" + array + "]," + index + ") returned [" + leftArray.concat(rightArray) + "]";
                        console.log(str);
                    }
                    return leftArray.concat(rightArray);
                }
                else {
                    throw "remove(): index out of bounds for array";
                }
            }
            else {
                throw "remove(): negative index value";
            }
        }
        else {
            throw "remove(): NOT array";
        }
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: [" + array + "]," + index + "]";
        }
        console.log("ERROR: " + err);
    }
}

function isNumberic(num) {
    return !isNaN(num);
}

exports.range = function (end, value) {
    try {
        if (end === undefined) {
            throw "range(): Input end not defined.";
        }
        var endInt = parseInt(end);
        if ((isNumberic(end)) &&
            (endInt > 0)) {
            var arr = [];
            for (let i = 0; i < endInt; i++) {
                if (value === undefined) {
                    arr.push(i);
                }
                else {
                    arr.push(value);
                }
            }

            if (ENABLE_PRINTS) {
                var str = "range(" + end + "," + value + ") returned " + arr;
                console.log(str);
            }
            return arr;
        }
        else {
            throw "range(): Invalid input end. Expected number.";
        }
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: " + end + "," + value + "]";
        }
        console.log("ERROR: " + err);
    }
}

// Will return an object with the count of each unique element in the array
exports.countElements = function (array) {
    try {
        if (array === undefined) {
            throw "Required input \'array\' undefined";
        }
        else if (!Array.isArray(array)) {
            throw "Required input \'array\' should be array type";
        }
        var dict = {};
        for (let i = 0; i < array.length; i++) {
            if (array[i] in dict) {
                dict[array[i]] = dict[array[i]] + 1;
            }
            else {
                dict[array[i]] = 1;
            }
        }

        if (ENABLE_PRINTS) {
            var str = "countElements([" + array + "]) returned " + JSON.stringify(dict);
            console.log(str);
        }
        return dict;
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: [" + array + "]]";
        }
        console.log("ERROR: countElements() - " + err);
    }
}

exports.isEqual = function (arrayOne, arrayTwo) {
    try {
        if ((arrayOne === undefined) ||
            (arrayTwo === undefined)) {
            throw "arrayOne and arrayTwo both need to be defined";
        }
        if ((false == Array.isArray(arrayOne)) ||
            (false == Array.isArray(arrayTwo))) {
            throw "arrayOne and arrayTwo both should be of type array"
        }

        var equals = true;

        if (arrayOne.length != arrayTwo.length) {
            equals = false;
        }

        if (true == equals) {
            for (let i = 0; i < arrayOne.length; i++) {
                if (arrayOne[i] != arrayTwo[i]) {
                    equals = false;
                    break;
                }
            }
        }

        if (ENABLE_PRINTS) {
            var str = "isEqual([" + arrayOne + "],[" + arrayTwo + "]) returned " + equals;
            console.log(str);
        }
        return equals;
    }
    catch (err) {
        if (ENABLE_PRINTS) {
            err += " - [input: [" + arrayone + "],[" + arrayTwo + "]]";
        }
        console.log("ERROR: isEqual() - " + err);
        return false;
    }
}

//export {head, last, remove, range, countElements, isEqual};