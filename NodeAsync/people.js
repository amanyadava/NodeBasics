const ENABLE_PRINTS = true;

const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

async function readFile(string) {
    data = await readFileAsync(string);
    return data;
}

const peopleJson = './data/people.json';

exports.getPersonById = function (id) {
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
        readFile(peopleJson)
        .then(function (result) {
            dataObjArray = JSON.parse(result);
            matchObj = null;
            dataObjArray.forEach(function (obj) {
                if (("id" in obj) &&
                    (obj.id == id)) {
                    matchObj = obj;
                }
            });
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
        })
        .catch(function (err) {
            console.log("ERROR: getPersonById(" + id + ") - " + err);
        });
    }
    catch (err) {
        console.log("ERROR: getPersonById(" + id + ") - " + err);
    }
}

exports.lexIndex = function (index) {
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
        readFile(peopleJson)
        .then(function (result) {
            dataObjArray = JSON.parse(result);
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
        })
        .catch(function (err) {
            console.log("ERROR: lexIndex(" + index + ") - " + err);
        })
    }
    catch (err) {
        console.log("ERROR: lexIndex(" + index + ") - " + err);
    }
}

exports.firstNameMetrics = function() {
    try {
        readFile(peopleJson)
        .then(function (result) {
            objArray = JSON.parse(result);
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
        })
        .catch(function (err) {
            console.log("ERROR: firstNameMetrics() - " + err);
        });
    }
    catch(err) {
        console.log("ERROR: firstNameMetrics() - " + err);
    }
}