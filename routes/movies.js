const router = require('express').Router;
const movieController = require('../controller/movieController');

// alreay at /movies/
router.route('/:query')
    .get(movieController.findMovie)

module.exports = router;