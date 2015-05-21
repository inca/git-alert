'use strict';

var git = require('./git')
  , fs = require('fs-extra')
  , path = require('path');

module.exports = exports = function (messages, done) {
  git.getDir(function (err, gitdir) {
    if (err) return done(err);
    var file = path.join(gitdir, '.git', 'alerts');
    var hashes = messages.map(function (msg) {
      return msg.hash;
    });
    fs.appendFile(file, hashes.join('\n') + '\n', 'utf-8', done);
  });
};
