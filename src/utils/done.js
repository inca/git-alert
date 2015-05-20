'use strict';

var colors = require('colors');

/**
 * Exits process with error code, if `err` provided.
 */
module.exports = function (err) {
  if (err) {
    process.stderr.write(colors.red(err.message || err) + '\n');
    process.exit(1);
  }
  process.exit(0);
};
