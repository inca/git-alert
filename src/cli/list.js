'use strict';

var done = require('../utils/done')
  , list = require('../utils/list')
  , colors = require('colors')
  , str = require('string')
  , moment = require('moment');

module.exports = function () {
  list(function (err, messages) {
    if (err) return done(err);
    messages.forEach(function (msg) {
      var line = '';
      var color = colors[require('../utils/color')(msg)];
      line += colors.yellow(msg.hash.substring(0, 8));
      line += ' ' + colors.gray(moment(msg.date).format('YYYY-MM-DD'));
      line += ' ' + str(msg.name).padRight(20).left(20).s;
      var m = str(msg.message).replace(/\n+/g, ' ').truncate(40).s;
      line += ' ' + color(m) + '\n';
      process.stdout.write(line);
    });
  });
};
