import axios from "axios";

const BASEURL = "http://www.omdbapi.com/?t=";
const APIKEY = "&apikey=trilogy";

export default {
  search: function(query) {
    return axios.get("/movies/" + query);
  }
};

