'use strict';

module.exports = function (yargs) {
  var argv = yargs
    .reset()
    .usage('Usage: git alert <message>')
    .demand(1, 'Specify a message')
    .argv;

  console.log(argv._[0]);
};
