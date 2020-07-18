const router = require('express').Router;
const axios = require('axios');
const BASEURL = "http://www.omdbapi.com/?t=";
const APIKEY = "&apikey=trilogy";

// alreay at /movies/
router.route('/:query')
    .get((req, res) => {
        axios.get(BASEURL + req.params.query + APIKEY)
            .then(data => {
                res.json(data.data)
            }).catch(err=> {
                res.json(err)
            })
    })

module.exports = router;