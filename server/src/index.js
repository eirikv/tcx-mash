// Globals
const ROOT = '${__dirname}/..';

global.__client = `${ROOT}/client`;
global.__server = `${ROOT}/server`;

// Set up resources
require('./resources')();
