'use strict';

module.exports = function (msg) {
  switch (msg.level) {
    case 'info':
      return 'green';
    case 'warn':
      return 'yellow';
    case 'critical':
      return 'red';
    default:
      return 'gray';
  }
};
