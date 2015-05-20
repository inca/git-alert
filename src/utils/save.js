'use strict';

var git = require('./git')
  , fs = require('fs-extra')
  , path = require('path');

/**
 * Save messages list.
 */
module.exports = function (messages, done) {
  git.getDir(function (err, cwd) {
    if (err) return done(err);
    var file = path.join(cwd, '.gitalert')
      , data = JSON.stringify(messages, null, 2);
    fs.writeFile(file, data, 'utf-8', done);
  });
};
