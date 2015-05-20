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
    var existing = null;
    for (var i = 0; i < messages.length; i++) {
      var m = messages[i];
      if (m.hash == msg.hash){
        existing = m;
        break;
      }
    }
    if (existing) {
      existing.level = level;
    } else {
      messages.push(msg);
    }
    save(messages, done);
  });
};
