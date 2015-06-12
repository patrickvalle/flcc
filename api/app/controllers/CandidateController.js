'use strict';

// Import dependencies
var _s = require('underscore.string');
var Candidate = require('../models/Candidate');
var ErrorResponse = require('../utilities/ErrorResponse');

/**
 * Controller responsible for handling RESTful interactions involving Candidate data
 */
module.exports = function(router) {

  /**
   * Retrieves a list of all candidates if no :id is specified.
   * If an :id is specified, a specific candidate will be returned with that id.
   */
  router.get('/candidates/:id?', function(request, response) {
    var id = request.params.id;
    var query = (id) ? Candidate.findOne().where('_id').equals(id) : Candidate.find().sort('-submitted');
    query.exec(function(error, data) {
      if(!error) {
        response.send(data);
      }
      else {
        ErrorResponse.send(response, 500, 'An error occurred while attempting to retrieve candidate data', error);
      }
    });
  });

  /**
   * Saves a new candidate.
   */
  router.post('/candidates', function(request, response) {
    var candidate = request.body;
    new Candidate(candidate).save(function(error, savedCandidate) {
      if(!error) {
        response.send(savedCandidate);
      }
      else {
        ErrorResponse.send(response, 500, 'An error occurred while attempting to save candidate data', error);
      }
    });
  });

};
