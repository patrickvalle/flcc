'use strict';

// Import dependencies
var Config = require('./Config');
var Log = require('./Log');

/**
 * Utility for managing RESTful error responses
 */
module.exports = function() {

  /**
   * Logs an error and sends an error response back to the client.
   *
   * @param {object} response - The Express response object
   * @param {number} status - HTTP status code to send
   * @param {string} message - Message to log and send
   * @param {object} [cause] - Cause of the error, usually in the form of an error object
   */
  var send = function(response, status, message, cause) {
    // Log the error and cause
    Log.error(message, cause);
    // Create the object to be returned to the client
    var error = {
      message: message
    };
    if(Config.dev) {
      error.cause = cause;
    }
    // Send the JSON back to the client
    response.status(status).send({
      error: error
    });
  };

  // Public API
  return {
    send: send
  };

}();