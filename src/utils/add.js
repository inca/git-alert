'use strict';

var list = require('./list')
  , save = require('./save')
  , git = require('./git')
  , async = require('async')
  , crypto = require('crypto');

function digest(msg) {
  var hash = crypto.createHash('sha256');
  hash.update(msg.name, 'utf-8');
  hash.update(msg.email, 'utf-8');
  hash.update(msg.message, 'utf-8');
  return hash.digest('hex');
}

/**
 * Adds a message.
 */
module.exports = function (text, level, done) {
  async.parallel([
    list,
    git.getAuthorName,
    git.getAuthorEmail
  ], function (err, results) {
    if (err) return done(err);
    var messages = results[0]
      , name = results[1]
      , email = results[2];
    var msg = {
      name: name,
      email: email,
      message: text,
      date: new Date(),
      level: level
    };
    msg.hash = digest(msg);
    // Check if this message already exists
    var existing = _find(messages, function (m) {
      return m.hash == msg.hash;
    });
    if (existing) {
      existing.level = level;
    } else {
      messages.push(msg);
    }
    save(messages, done);
  });
};

function _find(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (predicate(item))
      return item;
  }
  return null;
}
