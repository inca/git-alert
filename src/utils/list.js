'use strict';

var gitdir = require('./gitdir')
  , fs = require('fs-extra')
  , path = require('path');

/**
 * Read messages list.
 */
module.exports = function (done) {
  gitdir(function (err, cwd) {
    if (err) return done(err);
    fs.readJsonFile(path.join(cwd, '.gitalert'), 'utf-8', function (ignoredErr, messages) {
      messages = Array.isArray(messages) ? messages : [];
      done(null, messages);
    });
  });
};
