'use strict';

var fs = require('fs')
  , path = require('path')
  , git = require('./git');

/**
 * Ensures that a git hook with specified content exists.
 *
 * If hook does not exist, it will be created; the hook itself
 * is inserted with special comment-based markers to prevent double execution.
 */
module.exports = exports = function (name, content, done) {
  git.getDir(function (err, cwd) {
    if (err) return done(err);
    var file = path.join(cwd, '.git', 'hooks', name);
    fs.readFile(file, 'utf-8', function (ignoredErr, text) {
      text = text || '#!/bin/bash\n';
      content = '# git-alert: start\n' + content + '\n# git-alert: end\n';
      text = text.replace(/\n*#\s*git-alert:\s*start\n[\s\S]*?#\s*git-alert:\s*end\n/g, '')
        + '\n' + content;
      fs.writeFile(file, text, {
        encoding: 'utf-8',
        mode: '755'
      }, done);
    });
  });
};
