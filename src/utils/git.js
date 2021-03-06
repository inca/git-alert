'use strict';

var which = require('which')
  , spawn = require('child_process').spawn;

/**
 * Execute git command and buffer output.
 */
var git = module.exports = exports = function (args, done) {
  which('git', function (err, git) {
    if (err) return done(err);
    var ps = spawn(git, args)
      , stderr = ''
      , stdout = '';
    ps.on('error', function (err) {
      return done(err);
    });
    ps.stdout.on('data', function (data) {
      stdout += data.toString('binary');
    });
    ps.stderr.on('data', function (data) {
      stderr += data.toString('binary');
    });
    ps.on('close', function (code) {
      if (code == 0)
        return done(null, stdout.trim());
      return done(stderr.trim());
    });
  });
};

exports.getDir = function (done) {
  git(['rev-parse', '--show-toplevel'], done);
};

exports.getAuthorName = function (done) {
  git(['config', 'user.name'], done);
};

exports.getAuthorEmail = function (done) {
  git(['config', 'user.email'], done);
};

