const fs = require('fs');
const path = require('path');
const xmlUtils = require('./xml-utils');

const ROOT = path.resolve(__dirname, '..', '..', 'lib');

function getFile(fileName) {
    const filePath = path.join(ROOT, fileName);
    return fs.readFileSync(filePath, 'utf8');
}

function getParsedFile(fileName) {
    const file = getFile(fileName);
    return xmlUtils.parseXml(file);
}

module.exports = {
    getFile,
    getParsedFile,
};
