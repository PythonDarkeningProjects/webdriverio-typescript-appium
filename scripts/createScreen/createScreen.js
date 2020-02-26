const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const util = require('util');

// region Constants

const indexFile = path.join(__dirname, `../../src/domain/screens/index.ts`);
const indexFileTemp = path.join(__dirname, `../../src/domain/screens/index.temp.ts`);
const screenTemplate = path.join(__dirname, './screenTemplate.ts');
const screenTemplateTemp = path.join(__dirname, './screenTemplate.temp.ts');

// endregion

main();

function main () {
    process.argv.length <= 2 ? createScreenNoArgsSync() : createScreenSync(process.argv[2]);
}

function createScreenNoArgsSync () {
    rl.question(`Enter new screen name: `, (newScreenName) => {
        newScreenName.length == 0 && process.exit(0);
        createScreenSync(newScreenName);
    });
}

function createScreenSync (newScreenName) {
    newScreenName = newScreenName.replace(newScreenName[0], c => c.toUpperCase());

    let contents = fs.readFileSync(screenTemplate, `utf8`, (err) => {
        err && console.error(err.message);
    });
    console.log(`Template copied...`)

    fs.copyFileSync(screenTemplate, screenTemplateTemp, (err) => {
        err && console.error(err.message);
    });
    console.log(`Default template saved...`);

    let result = contents.replace(/GeneratedScreenName/g, newScreenName);

    fs.writeFileSync(screenTemplateTemp, result, `utf8`, (err) => {
        err && console.error(err.message);
    });
    console.log(`Template file created...`);

    let fileName = path.join(__dirname, `../../src/domain/screens/${formatFileName(newScreenName)}`);

    fs.copyFileSync(screenTemplateTemp, fileName, (err) => {
        err && console.error(err.message);
    });
    console.log(`New screen file created...`);

    fs.appendFileSync(indexFile, formatForIndex(newScreenName, formatFileName(newScreenName)), (err) => {
        err && console.error(err.message);
        console.log(`New screen appended to index...`);
    });

    fs.unlinkSync(screenTemplateTemp, (err) => {
        err && console.error(err.message);
    });
    console.log(`Temp file removed...`);

    sortIndex();

    console.log(`Sorted index...`);

    fs.existsSync(fileName) && process.exit(0);
}

// region Utility Methods

function formatFileName (newScreenName) {
    splitScreenName = newScreenName.split(/(?=[A-Z])/);
    fileName = ``;
    splitScreenName.forEach(word => {
        (splitScreenName.indexOf(word) == splitScreenName.length - 1 && word.toLowerCase() == `screen`)
            ? word = ``
            : word = `.${word.toLowerCase()}`
        fileName = `${fileName}${word}`;
    });
    fileName = fileName.substr(1);
    fileName = `${fileName}.screen.ts`;

    return fileName;
}

function formatForIndex (newScreenName, fileName) {
    fileName = fileName.replace(`.ts`, ``);
    newScreenName = newScreenName.replace(newScreenName[0], c => c.toLowerCase());
    let indices = `\r\nexport { default as ${newScreenName} } from './${fileName}';`
    return indices;
}

function sortIndex () {
    console.log(`Sorting index...`)
    fs.readFileSync(indexFile)
        .toString()
        .split('\r\n')
        .filter((record) => record != '')
        .sort((a, b) => a.localeCompare(b))
        .forEach(record => {
            fs.appendFileSync(indexFileTemp, record + `\r\n`, (err) => {
                err && console.error(err.message);
            });
        });
    fs.copyFileSync(indexFileTemp, indexFile);
    fs.unlinkSync(indexFileTemp);
}

// endregion