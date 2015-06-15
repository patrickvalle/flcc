'use strict';

var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var ApplicationSchema = new Schema({
  name: {
    first: {
      type: String
    },
    last: {
      type: String
    }
  },
  email: {
    type: String
  },
  answers: {
    one: {
      type: String
    },
    two: {
      type: String
    },
    three: {
      type: String
    }
  },
  submitted: {
    type: Date,
    default: Date.now
  }
});

var Application = Mongoose.model('Application', ApplicationSchema);

module.exports = Application;