const ENABLE_PRINTS = true;
const weatherJson = './data/weather.json';
const fileUtils = require('./fileUtils');
const people = require('./people');

async function getWeatherAtZip(zip) {
    try {
        if (zip === undefined) {
            throw "zip unspecified";
        }
        if (Object.prototype.toString.call(zip).toLowerCase() !== '[object string]') {
            throw "zip should be string type";
        }
        let fileString = await fileUtils.readFile(weatherJson);
        weatherObjArray = JSON.parse(fileString);
        len = weatherObjArray.length;
        for (var i = 0; i < len; i++) {
            if (weatherObjArray[i].zip == zip) {
                return weatherObjArray[i];
            }
        }
        return null;
    }
    catch (err) {
        console.log("ERROR: getWeatherAtZip(" + zip + ") - " + err);
    }
}

exports.shouldTheyGoOutside = async function (firstName, lastName) {
    try {
        if ((firstName === undefined) ||
            (lastName === undefined)) {
            throw "firstName or lastName unspecified";
        }
        if ((Object.prototype.toString.call(firstName) != "[object String]") ||
            (Object.prototype.toString.call(firstName) != "[object String]")) {
            throw "Input parameter was not string;";
        }
        let person = await people.getPersonByName(firstName, lastName);
        if (person === null) {
            throw "No such person found";
        }
        zip = person.zip;
        let weather = await getWeatherAtZip(zip);
        if (weather == null) {
            throw "No weather data found for the person\'s zip=" + zip;
        }
        yes = (weather.temp > 34);
        retString = (yes ? "Yes" : "No") +
            ", " + firstName + " should " + (yes ? "" : "not ") + "go outside.";
        if (ENABLE_PRINTS) {
            console.log("shouldTheyGoOutside(" + firstName + ", " + lastName
            + ") returned - " + retString);
        }
        return retString;
    }
    catch (err) {
        console.log("ERROR: shouldTheyGoOutside(" + firstName + ", " + lastName
            + ") - " + err);
    }
}