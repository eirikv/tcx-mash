const express = require('express');
const path = require('path');

const tcxResource = require('./TcxResource');

const app = express();
const public = path.resolve(__client, 'app');

module.exports = function() {
  // Serving public files - client
  app.use(express.static(public));

  // Setting up resources
  tcxResource(app);

  // Start express
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });
};
