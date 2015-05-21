'use strict';

var done = require('../src/utils/done')
  , git = require('../src/utils/git')
  , hook = require('../src/utils/hook')
  , colors = require('colors')
  , path = require('path')
  , fs = require('fs');

/**
 * This script is executed by npm when the package is installed.
 */
git.getDir(function (err, gitdir) {
  if (err) {
    // not a git dir, don't do anything
    return done();
  }
  var installDir = path.join(gitdir, 'node_modules/git-alert');
  fs.stat(installDir, function (err) {
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
