'use strict';

var _ = require('lodash');
var movie = require('./movie.model');

// Get list of movies
exports.index = function(req, res) {
          // Connect to the db
   movie.find(function (err, movies) {
    if(err) { return handleError(res, err); }
    return res.json(200, movies);
  });

} ;

  exports.show = function(req, res) {
      movie.findById(req.params.id, function (err, post) {
          if(err) { return handleError(res, err); }
          return res.json(200, post);
      });
  } ;


  exports.show_rating = function(req, res) {
      movie.findById(req.params.id, function (err, movie) {
          if(err) { return handleError(res, err); }
        var overall_rating = movie.rating
          return res.json(200, overall_rating);
      });
  } ;
 

// Creates a new movie in datastore.
exports.create = function(req, res) {
   req.body.reviews = []
   req.body.rating = 0
  movie.create(req.body, function(err, movie) {
    if(err) { return handleError(res, err); }
    return res.json(201, movie);
  });
};



// Updates an existing movie in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  movie.findById(req.params.id, function (err, movie) {
    if (err) { return handleError(res, err); }
    if(!movie) { return res.send(404); }
    var updated = _.merge(movie, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, movie);
    });
  });
};

// delete an existing movie in datastore.
exports.delete = function(req, res) {
    movie.findById(req.params.id, function (err, movie) {
    if(err) { return handleError(res, err); }
    if(!movie) { return res.send(404); }
    movie.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

  // Add a comment to a post
  exports.delete_review = function(req, res) {
     movie.findById(req.params.movie_id, function (err, movie) {
        
            movie.reviews.splice(movie.reviews.indexOf(req.params.review_id),1)
            movie.save(function (err) {
              if(err) { return handleError(res, err); }
              return res.send(204);
            });
      });
   };




  // Add a comment to a post
  exports.add_review = function(req, res) {
     movie.findById(req.params.id, function (err, movie) {
            var review = {
                body: req.body.body,
                author: req.body.author ,
                rating: req.body.rating
             }
            movie.reviews.push(review);
            var sum = 0;
    for( var i = 0; i < movie.reviews.length; i++ ){
    sum += movie.reviews[i].rating //don't forget to add the base
    }
            movie.rating = sum/movie.reviews.length

            movie.save(function (err) {
              if(err) { return handleError(res, err); }
              var last = _.last(movie.reviews)
              if (last != undefined) {
                 return res.json(200, last);
              } else {
                return res.send(500,"Database error")
                 }
            });
      });
  };

function handleError(res, err) {
  return res.send(500, err);
};
