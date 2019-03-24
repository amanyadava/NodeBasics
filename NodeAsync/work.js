const ENABLE_PRINTS = true;
const fileUtils = require('./fileUtils');
const people = require('./people');
const workJson = './data/work.json';

function isString(x) {
    return Object.prototype.toString.call(x) == '[object String]';
}

async function getWorkFromSsn(ssn) {
    if (ssn === undefined) {
        throw "ssn argument undefined";
    }
    if (!isString(ssn)) {
        throw "ssn should be of type string";
    }
    let dataString = await fileUtils.readFile(workJson);
    workObjArray = JSON.parse(dataString);
    var len = workObjArray.length;
    for (var i = 0; i < len; i++) {
        if (workObjArray[i].ssn == ssn) {
            return workObjArray[i];
        }
    }
    return null;
}

exports.whereDoTheyWork = async function (firstName, lastName) {
    try {
        if (firstName === undefined ||
            lastName === undefined) {
            throw "firstName or lastName was undefined";
        }
        if (!isString(firstName) || !isString(lastName)) {
            throw "both firstName and lastName should be strings";
        }
        let person = await people.getPersonByName(firstName, lastName);
        if (person === undefined) {
            throw "Invalid args";
        }
        if (person == null) {
            throw "No such person found in DB";
        }
        ssn = person.ssn;
        if (ssn === undefined) {
            throw "person\'s ssn not found";
        }
        work = await getWorkFromSsn(ssn);
        if (work == null) {
            throw "No work info found for the person";
        }
        retString = firstName + " " + lastName + " - " + work.jobTitle + " at "
            + work.company + ". They will " + (work.willBeFired ? "" : "not ")
            + "be fired.";

        if (ENABLE_PRINTS) {
            console.log("whereDoTheyWork(" + firstName + ", " + lastName + ")"
                + " returned - " + retString);
        }
        return retString;
    }
    catch(err) {
        console.log("ERROR: whereDoTheyWork(" + firstName + ", " +  lastName +
            ") - " + err);
    }
}

function isValidIp(ip) {
    if (ip === undefined || !isString(ip)) {
        return false;
    }
    var parts = ip.split('.');
    if (parts.length != 4) {
        return false;
    }
    pattern = /(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])/;
    for (var i = 0; i < 4; i++) {
        if (false == pattern.test(parts[i])) {
            return false;
        }
    }
    return true;
}

async function getWorkFromIp(ip) {
    if (ip === undefined || !isString(ip) || !isValidIp(ip)) {
        return null;
    }
    let dataString = await fileUtils.readFile(workJson);
    workObjArray = JSON.parse(dataString);
    len = workObjArray.length;
    for (var i = 0; i < len; i++) {
        if (workObjArray[i].ip == ip) {
            return workObjArray[i];
        }
    }
    return null;
}

exports.findTheHacker = async function (ip) {
    try {
        if (ip === undefined) {
            throw "findTheHacker() - ip was undefined";
        }
        if (!isString(ip)) {
            throw "findTheHacker() - ip should be string type";
        }
        if (false == isValidIp(ip)) {
            throw "findTheHacker() - ip is not valid";
        }
        let work = await getWorkFromIp(ip);
        if (work == null) {
            throw "findTheHacker() - no data found for ip=" + ip;
        }
        let person = await people.getPersonBySsn(work.ssn);
        if (person === undefined || person == null) {
            throw "findTheHacker() - no person found for ssn=" + work.ssn;
        }
        retString = person.firstName + " " + person.lastName + " is the hacker!";
        if (ENABLE_PRINTS) {
            console.log("findTheHacker(" + ip + ") returned - " + retString);
        }
        return retString;
    }
    catch(err) {
        console.log("ERROR: findTheHacker(" + ip + ") returned - " + err);
    }
}