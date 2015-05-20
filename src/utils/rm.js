'use strict';

var list = require('./list')
  , save = require('./save');

/**
 * Removes a message designated by specified hash.
 */
module.exports = function (hash, done) {
  list(function (err, messages) {
    if (err) return done(err);
    var indexes = [];
    messages.forEach(function (msg, i) {
      if (msg.hash.indexOf(hash) == 0)
        indexes.push(i);
    });
    if (indexes.length > 1)
      return done(new Error('Multiple messages matched. Please be more specific.'));
    if (!indexes.length)
      return done(new Error('Message not found.'));
    var idx = indexes[0];
    messages.splice(idx, 1);
    save(messages, done);
  });
};
