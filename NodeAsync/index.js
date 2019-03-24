const people = require('./people');
const weather = require('./weather');
const work = require('./work');

async function test() {
    await people.getPersonById(43); // Returns: "Brew Peat"
    await people.getPersonById(-1); // Throws Error
    await people.getPersonById(1000); // Throws Error
    await people.getPersonById(); // Throws Error

    console.log();

    await people.lexIndex(2); // Returns: "Dermot Abberley"
    await people.lexIndex(-1); // Throws Error
    await people.lexIndex(1000); // Throws Error
    await people.lexIndex(); // Throws Error

    console.log();

    await people.firstNameMetrics();

    console.log();

    await weather.shouldTheyGoOutside("Scotty", "Barajaz"); // Returns "Yes, Scotty should go outside."
    await weather.shouldTheyGoOutside("Calli", "Ondrasek"); // Returns "No, Calli should not go outside."
    await weather.shouldTheyGoOutside(); // Throws Error
    await weather.shouldTheyGoOutside("Bob"); // Throws Error
    await weather.shouldTheyGoOutside("Bob", "Smith"); // Throws Error

    console.log();

    await work.whereDoTheyWork("Demetra", "Durrand"); // Returns: "Demetra Durrand - Nuclear Power Engineer at Buzzshare. They will be fired."
    await work.whereDoTheyWork("Hank", "Tarling"); // Returns: "Hank Tarling - Technical Writer at Babbleblab. They will not be fired."
    await work.whereDoTheyWork(); // Throws Error
    await work.whereDoTheyWork("Bob"); // Throws Error
    await work.whereDoTheyWork("Bob", "Smith"); // Throws Error

    console.log();

    await work.findTheHacker("79.222.167.180"); // Returns: "Robert Herley is the hacker!"
    await work.findTheHacker("foobar"); // Throws Error
    await work.findTheHacker(); // Throws Error
}

test();