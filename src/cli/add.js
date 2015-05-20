'use strict';

var add = require('../utils/add')
  , done = require('../utils/done');

module.exports = function (yargs) {
  var argv = yargs
    .reset()
    .strict()
    .usage('Usage: git alert <message> [--info] [--warn] [--critical] ')
    .demand(1, 'Specify a message')
    .describe('info', 'Add an information message')
    .describe('warn', 'Add a warning')
    .describe('critical', 'Add a critical message')
    .argv;
  // Parse message level
  var level = 'default';
  if (argv.critical)
    level = 'critical';
  else if (argv.warn)
    level = 'warn';
  else if (argv.info)
    level = 'info';
  // Add it
  add(argv._[0], level, done);
};
