'use strict';

// Import dependencies
var _s = require('underscore.string');
var Application = require('../models/Application');
var ErrorResponse = require('../utilities/ErrorResponse');

/**
 * Controller responsible for handling RESTful interactions involving Application data
 */
module.exports = function(router) {

  /**
   * Retrieves a list of all applications if no :id is specified.
   * If an :id is specified, a specific application will be returned with that id.
   */
  router.get('/applications/:id?', function(request, response) {
    var id = request.params.id;
    var query = (id) ? Application.findOne().where('_id').equals(id) : Application.find().sort('-submitted');
    query.exec(function(error, data) {
      if(!error) {
        response.send(data);
      }
      else {
        ErrorResponse.send(response, 500, 'An error occurred while attempting to retrieve application data', error);
      }
    });
  });

  /**
   * Saves a new application.
   */
  router.post('/applications', function(request, response) {
    var application = request.body;
    new Application(application).save(function(error, savedApplication) {
      if(!error) {
        response.send(savedApplication);
      }
      else {
        ErrorResponse.send(response, 500, 'An error occurred while attempting to save application data', error);
      }
    });
  });
  
  /**
   * Removes an existing application with the specified :id.
   */
  router.delete('/applications/:id', function(request, response) {
    var id = request.params.id;
    Application.findOneAndRemove({ '_id': id }, function(error, removedApplication) {
      if(!error) {
        response.send(removedApplication);
      }
      else {
        ErrorResponse.send(response, 500, 'An error occurred while attempting to remove application data', error);
      }
    });
  });

};
