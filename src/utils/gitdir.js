'use strict';

var git = require('./git');

/**
 * Find git working directory.
 */
module.exports = function (done) {
  git(['rev-parse', '--show-toplevel'], function (err, gitdir) {
    if (err) return done(err);
    done(null, gitdir.trim());
  });
};
