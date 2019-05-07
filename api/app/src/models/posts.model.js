'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Posts = new Schema({
  name: {type: String, required: false },
  location: {type: String, required: false },
  image: {type: String, required: false},
  text: {type: String, required: true, trim: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Posts', Posts);