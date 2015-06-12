'use strict';

/**
 * Object containing all of the app config settings.
 * Retrieve a property via syntax similar to:
 * 
 *   - Config.server.host
 *   - Config.database.port
 */
module.exports = function() {

  return {
    'server': {
      'host': process.env.FLCC_SERVER_HOST || 'localhost',
      'port': process.env.FLCC_SERVER_PORT || '3000'
    },
    'api': {
      'root': '/api'
    },
    'database': {
      'host': process.env.FLCC_DATABASE_HOST || 'localhost',
      'port': process.env.FLCC_DATABASE_PORT || '27017',
      'name': process.env.FLCC_DATABASE_NAME || '',
      'user': process.env.FLCC_DATABASE_USER || '',
      'pass': process.env.FLCC_DATABASE_PASS || ''
    },
    'log': {
      'level': process.env.FLCC_LOG_LEVEL || 'debug'
    },
    'dev': process.env.FLCC_DEV_MODE || true
  };

}();