'use strict';

var rm = require('../utils/rm')
  , done = require('../utils/done');

module.exports = function (yargs) {
  var argv = yargs
    .reset()
    .usage('Usage: git alert rm <hash>')
    .demand(2, 'Specify a hash of message to remove')
    .argv;
  rm(argv._[1], done);
};
