'use strict';

var gitdir = require('./gitdir')
  , fs = require('fs-extra')
  , path = require('path');

/**
 * Save messages list.
 */
module.exports = function (messages, done) {
  gitdir(function (err, cwd) {
    if (err) return done(err);
    var file = path.join(cwd, '.gitalert')
      , data = JSON.stringify(messages, null, 2);
    fs.writeFile(file, data, 'utf-8', done);
  });
};
