const xml2js = require('xml2js');

function parseXml(str) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(str, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {
    parseXml,
};
