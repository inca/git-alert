'use strict';

var done = require('../src/utils/done')
  , git = require('../src/utils/git')
  , hook = require('../src/utils/hook')
  , colors = require('colors')
  , which = require('which');

/**
 * This script is executed by npm when the package is installed.
 */
git.getDir(function (err, gitdir) {
  if (err) {
    // not a git dir, don't do anything
    return done();
  }
  which('git-alert', function (err) {
    var cmd = err ? 'node node_modules/git-alert/bin/git-alert.js show'
        : 'git alert show';
    hook('post-merge', cmd, function (err) {
      if (err) return done(err);
      process.stdout.write(colors.yellow('git-alert:') +
        ' installed post-merge hook at ' + gitdir + '\n');
      done();
    });
  });
});
