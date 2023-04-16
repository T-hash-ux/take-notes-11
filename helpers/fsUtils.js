const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);



const writeToFIle = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
    err ? console.error(err) : console.info(`\nData written to ${destination}`)

);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataParsed = JSON.parse(data);
            dataParsed.push(content);
            writeToFIle(file, dataParsed);
        }
    });
};

module.exports = { readFromFile, writeToFIle, readAndAppend };


