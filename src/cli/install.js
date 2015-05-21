'use strict';

var done = require('../utils/done')
  , git = require('../utils/git')
  , hook = require('../utils/hook')
  , colors = require('colors')
  , path = require('path')
  , fs = require('fs');

module.exports = function () {
  git.getDir(function (err, gitdir) {
    if (err) {
      // not a git dir, don't do anything
      return done();
    }
    // See if local version can be used instead of global
    var moduleDir = path.join(gitdir, 'node_modules/git-alert');
    fs.stat(moduleDir, function (err) {
      var cmd = err ? 'git alert show'
        : 'node node_modules/git-alert/bin/git-alert.js show';
      hook('post-merge', cmd, function (err) {
        if (err) return done(err);
        process.stdout.write(colors.yellow('git-alert:') +
          ' installed post-merge hook at ' + gitdir + '\n');
        done();
      });
    });
  });
};
