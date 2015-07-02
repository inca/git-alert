'use strict';

var git = require('./git')
  , fs = require('fs-extra')
  , path = require('path');

/**
 * Read messages list.
 */
module.exports = exports = function (done) {
  git.getDir(function (err, cwd) {
    if (err) return done(err);
    fs.readJson(path.join(cwd, '.gitalert'), 'utf-8', function (ignoredErr, messages) {
      messages = Array.isArray(messages) ? messages : [];
      done(null, messages);
    });
  });
};

/**
 * Read messages, filtering the ones that you've already read.
 */
exports.unread = function (done) {
  git.getDir(function (err, cwd) {
    if (err) return done(err);
    var file = path.join(cwd, '.git', 'alerts');
    fs.readFile(file, 'utf-8', function (ignoredErr, text) {
      var hashes = text ? text.split('\n') : [];
      exports(function (err, messages) {
        if (err) return done(err);
        done(null, messages.filter(function (msg) {
          return hashes.indexOf(msg.hash) == -1;
        }));
      });
    });
  });
};
