'use strict';

var express = require('express');
var controller = require('./movie.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/:id/reviews', controller.add_review);
router.delete('/:movie_id/reviews/:review_id', controller.delete_review);


module.exports = router;