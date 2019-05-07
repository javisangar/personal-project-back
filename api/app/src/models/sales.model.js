'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Sales = new Schema({
  name: {type: String, required: false },
  location: {type: String, required: false },
  image: {type: String, required: false},
  brand: {type: String, required: false, trim: true},
  kilometers: {type: Number, required: false, trim: true},
  price: {type: Number, required: false, trim: true},
  text: {type: String, required: false},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: false},
  createdAt: {type: Date, required: true, default: Date.now}
  
});

module.exports = mongoose.model('Sales', Sales);