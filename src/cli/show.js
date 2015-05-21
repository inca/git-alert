'use strict';

var done = require('../utils/done')
  , list = require('../utils/list')
  , markRead = require('../utils/markRead')
  , colors = require('colors')
  , wrap = require('wordwrap').hard(0, 64);

module.exports = function () {
  list.unread(function (err, messages) {
    if (err) return done(err);
    messages.forEach(function (msg) {
      var color = colors[require('../utils/color')(msg)];
      process.stdout.write('\n\n');
      emitBorder(color, '#');
      emitLine(color);
      emitLine(color, msg.name + colors.gray(' says:'));
      emitLine(color);
      emitBorder(color, '#');
      emitLine(color);
      wrap(msg.message).split('\n').forEach(function (line) {
        emitLine(color, color(line));
      });
      emitLine(color);
      emitLine(color, colors.gray('Use ') +
        'git alert rm ' + msg.hash.substring(0, 8) +
        colors.gray(' to remove this message.'));
      emitLine(color);
      emitBorder(color, '#');
      process.stdout.write('\n\n');
      markRead(messages, done);
    });
  });
};

function emitBorder(color, char) {
  process.stdout.write(color('    #'));
  var s = '';
  for (var i = 0; i < 68; i++)
    s += char;
  process.stdout.write(color(s + '#') + '\n');
}

function emitLine(color, str) {
  str = str || '';
  process.stdout.write(color('    #  '));
  process.stdout.write(str);
  var actualLength = str.replace(/\u001b.*?m/g, '').length;
  for (var i = actualLength; i < 64; i++)
    process.stdout.write(' ');
  process.stdout.write(color('  #\n'));
}
