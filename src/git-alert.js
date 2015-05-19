#!/usr/bin/env node
'use strict';

var yargs = require('yargs');

var argv = yargs
  .usage('Usage: git alert <command> [options]\n       git alert <message>')
  .help('help')
  .alias('help', 'h')
  .command('list', 'List all messages')
  .command('show', 'Show unread messages and mark them as read')
  .command('rm', 'Remove a message')
  .command('install', 'Install post-merge hook in repository')
  .example('git alert \'Hello world\'', 'Add a message to .gitalert')
  .example('git show', 'Show pending (unread) messages')
  .example('git list', 'List all messages')
  .example('git rm e3bc5', 'Remove a message with specified hash')
  .demand(1, 'Specify a command or message')
  .argv;

var commands = ['list', 'show', 'rm', 'install']
  , cmd = argv._[0];

if (commands.indexOf(cmd) != -1)
  return require('./cli/' + cmd)(yargs);

if (argv._.length > 1)
  return yargs
    .epilogue('More options than expected; be sure to wrap your message in quotes.')
    .showHelp();

require('./cli/add')(yargs);

