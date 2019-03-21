const people = require('./people');

//people.getFileData('./data/people.json');

people.getPersonById(43) // Returns: "Brew Peat"
people.getPersonById(-1) // Throws Error
people.getPersonById(1000) // Throws Error
people.getPersonById() // Throws Error

console.log();

people.lexIndex(2) // Returns: "Dermot Abberley"
people.lexIndex(-1) // Throws Error
people.lexIndex(1000) // Throws Error
people.lexIndex() // Throws Error

console.log();

people.firstNameMetrics();