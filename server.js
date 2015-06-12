'use strict';

/**
 * Main "driver" class responsible for bootstrapping the app
 */

// Constants
var API_CONTROLLERS_PATH = './api/app/controllers';
var API_MODELS_PATH = './api/app/models';
var PUBLIC_STATIC_FILES_PATH = './public/app';

// Import dependencies
var BodyParser = require('body-parser');
var Express = require('express');
var Mongoose = require('mongoose');
var RequireDirectory = require('require-directory');
var Config = require('./api/app/utilities/Config');
var ErrorResponse = require('./api/app/utilities/ErrorResponse');
var Log = require('./api/app/utilities/Log');

// Setup Mongoose connection
(function() {
  var port = (Config.database.port.length > 0) ? ":" + Config.database.port : '';
  var login = (Config.database.user.length > 0) ? Config.database.user + ":" + Config.database.pass + "@" : '';
  var uri =  "mongodb://" + login + Config.database.host + port + "/" + Config.database.name;
  Mongoose.connect(uri, { db: { 
    safe: true 
  }}, function (error) {
    if(error) {
      Log.error('Unable to connect to Mongo database @ %s.', uri);
    } else {
      Log.info('Successfully connected to Mongo database @ %s.', uri);
    }
  });
}());

// Setup Express server
(function(){
  // Create router (for Controllers to mount their request handlers to)
  var router = Express.Router();
  // Setup CORS on the router (dev only)
  if(Config.dev) {
    router.use(function(request, response, next) {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }
  // Setup JSON request parsing
  router.use(BodyParser.json());
  // Bootstrap controllers and attach their corresponding routes to the router
  RequireDirectory(module, API_CONTROLLERS_PATH, { visit: function(controller) {
    controller(router);
  }});
  // Create server and mount the router
  var server = Express();
  server.use(Config.api.root, router);
  // Configure static file support
  server.use(Express.static(PUBLIC_STATIC_FILES_PATH));
  // Configure global error handling
  server.use(function(error, request, response, next) {
    ErrorResponse.send(response, 500, 'General error encountered.', error.stack);
  });
  // Start server
  var instance = server.listen(Config.server.port, function() {
    var port = instance.address().port;
    Log.info('Express server started on port %s.', port);
  });
}());
