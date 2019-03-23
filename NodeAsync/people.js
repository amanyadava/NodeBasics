const ENABLE_PRINTS = true;

const fileUtils = require('./fileUtils');

const peopleJson = './data/people.json';

exports.getPersonById = async function (id) {
    try {
        if (id === undefined) {
            throw "Parameter id not specified";
        }
        if (false == Number.isInteger(id)) {
            throw "Parameter id is not integer - was " + id;
        }
        if (id < 0) {
            throw "Parameter id should be positive integer - was " + id;
        }
        let dataString = await fileUtils.readFile(peopleJson);
        dataObjArray = JSON.parse(dataString);
        matchObj = null;
        len = dataObjArray.length;
        for (var i = 0; i < len; i++) {
            if (dataObjArray[i].id === id) {
                matchObj = dataObjArray[i];
                break;
            }
        }
        if (null != matchObj) {
            if (ENABLE_PRINTS) {
                console.log("getPersonById(" + id + ") returned - " +
                    matchObj.firstName + " " + matchObj.lastName);
            }
            return matchObj.firstName + " " + matchObj.lastName;
        }
        else {
            throw "No person found by id=" + id;
        }
    }
    catch (err) {
        console.log("ERROR: getPersonById(" + id + ") - " + err);
    }
}

exports.lexIndex = async function (index) {
    try {
        if (index === undefined) {
            throw "Index unspecified";
        }
        if (false == Number.isInteger(index)) {
            throw "Index should be a positive integer, but was - " + index;
        }
        if (index < 0) {
            throw "Index should be a positive integer, but was negative - " + index;
        }
        let dataString = await fileUtils.readFile(peopleJson);
        dataObjArray = JSON.parse(dataString);
        dataObjArray.sort(function(x, y) {
            if (x.lastName < y.lastName) {
                return -1;
            }
            if (x.lastName > y.lastName) {
                return 1;
            }
            return 0;
        });

        if (index < dataObjArray.length) {
            personObj = dataObjArray[index];
            if (ENABLE_PRINTS) {
                console.log("lexIndex(" + index + ") returned - " +
                    personObj.firstName + " " + personObj.lastName);
            }
            return personObj.firstName + " " + personObj.lastName;
        }
        else {
            throw "index out of bounds. Only " + dataObjArray.length +
                " entries for people";
        }
    }
    catch (err) {
        console.log("ERROR: lexIndex(" + index + ") - " + err);
    }
}

exports.firstNameMetrics = async function() {
    try {
        let dataString = await fileUtils.readFile(peopleJson);
        objArray = JSON.parse(dataString);
        totalLetters = 0;
        totalVowels = 0;
        longestName = objArray[0].firstName;
        shortestName = objArray[0].firstName;
        vowels = ['a', 'e', 'i', 'o', 'u'];
        objArray.forEach(function (obj) {
            if ("firstName" in obj) {
                totalLetters += obj.firstName.length;
                iter = obj.firstName.length;
                if (iter > longestName.length) {
                    longestName = obj.firstName;
                }
                if (iter < shortestName) {
                    shortestName = obj.firstName;
                }
                while (--iter) {
                    if (vowels.includes(obj.firstName.charAt(iter))) {
                        totalVowels++;
                    }
                }
            }
        });

        if (ENABLE_PRINTS) {
            console.log("firstNameMetrics(): " +
                "totalLetters=" + totalLetters +
                " totalVowels=" + totalVowels +
                " totalConsonants=" + (totalLetters - totalVowels) +
                " longestName=" + longestName +
                " shortestName=" + shortestName);
        }

        return [totalLetters, totalVowels, totalLetters - totalVowels,
            longestName, shortestName];
    }
    catch(err) {
        console.log("ERROR: firstNameMetrics() - " + err);
    }
}

function isString(str) {
    return Object.prototype.toString.call(str).toLowerCase() === '[object string]';
}

exports.getPersonByName = async function(firstName, lastName) {
    try {
        if ((firstName === undefined) ||
            (lastName === undefined)) {
            throw "firstName or lastName was not specified";
        }
        if (!isString(firstName) || !isString(lastName)) {
            throw "firstName or lastName was not of string type";
        }
        let dataString = await fileUtils.readFile(peopleJson);
        dataObjArray = JSON.parse(dataString);
        matchedPerson = null;
        var len = dataObjArray.length;
        for (var i = 0; i < len; i++) {
            if (dataObjArray[i].firstName === firstName &&
                dataObjArray[i].lastName === lastName) {
                matchedPerson = dataObjArray[i];
                break;
            }
        }
        return matchedPerson;
    }
    catch (err) {
        console.log("ERROR: getPersonByName(" + firstName + "," + lastName +
            ") - " + err);
    }
}