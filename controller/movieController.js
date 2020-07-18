const axios = require('axios');
const BASEURL = "http://www.omdbapi.com/?t=";
const APIKEY = "&apikey=trilogy";


module.exports = {
    findMovie: function(req, res) {
        axios.get(BASEURL + req.params.query + APIKEY)
            .then(data => {
                res.json(data.data)
            }).catch(err=> {
                res.json(err)
            })
    }
}