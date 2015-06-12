'use strict';

var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var CandidateSchema = new Schema({
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

var Candidate = Mongoose.model('Candidate', CandidateSchema);

module.exports = Candidate;