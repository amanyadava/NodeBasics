const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

exports.readFile = async function (string) {
    data = await readFileAsync(string);
    return data;
}