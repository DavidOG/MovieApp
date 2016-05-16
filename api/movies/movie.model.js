'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

 var reviewSchema = new Schema({
        body: { type: String, required: true },
        author: { type: String, required: true },
        rating: {type: Number, min: 0, max: 10 , required: true}
      });

var movieSchema = new Schema({
  age: Number,
  title: String,
  imageUrl: String,
  name: String,
  snippet: String,
  released: Date,
  reviews : [reviewSchema],
  rating: Number
});

module.exports = mongoose.model('movie', movieSchema);