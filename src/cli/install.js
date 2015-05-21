'use strict';

var done = require('../utils/done')
  , hook = require('../utils/hook');

module.exports = function () {
  hook('post-merge', 'git alert show', done);
};
