'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Character = new Schema({
  name: {type: String, required: true },
  email: {type: String, required: true},
  family: {type: String, required: true, trim: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Character', Character);
