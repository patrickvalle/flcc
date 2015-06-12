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
      'port': process.env.FLCC_SERVER_PORT || process.env.PORT
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