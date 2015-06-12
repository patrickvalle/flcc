'use strict';

// Import dependencies
var _s = require('underscore.string');
var Winston = require('winston'); 
var Config = require('./Config');

/**
 * Wrapper class for the Winston logger
 */
process.stdout.write('Initializing logger...');

try {
  var log = new Winston.Logger({
    transports: [
      new Winston.transports.Console({ 
        level: Config.log.level
      })
    ]
  });
  module.exports = log;
  process.stdout.write(' done!\n');
}
catch(Error) {
  process.stderr.write(' failed!\n');
  throw Error;
}