'use strict';

var done = require('../utils/done')
  , list = require('../utils/list')
  , formatLine = require('../utils/formatLine');

module.exports = function () {
  list(function (err, messages) {
    if (err) return done(err);
    messages.forEach(function (msg) {
      process.stdout.write(formatLine(msg));
    });
  });
};
