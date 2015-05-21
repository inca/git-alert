'use strict';

module.exports = function (msg) {
  switch (msg.level) {
    case 'info':
      return 'cyan';
    case 'warn':
      return 'yellow';
    case 'critical':
      return 'red';
    default:
      return 'green';
  }
};
