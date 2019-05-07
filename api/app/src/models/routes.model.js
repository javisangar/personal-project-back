'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Routes = new Schema({
  name: {type: String, required: false },
  location: {type: String, required: false },
  image: {type: String, required: false},
  map: {type: String, required: false, trim: true},
  start: {type: String, required: false, trim: true},
  end: {type: String, required: false, trim: true},
  description: {type: String, required: false, trim: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Routes', Routes);