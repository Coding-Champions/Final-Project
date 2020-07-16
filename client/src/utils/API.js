import axios from "axios";

const MOVIES = "http://www.omdbapi.com/?apikey=a0bbf946&s=";


export default {
  search: function() {
    return axios.get(MOVIES);
  }
};

// CONVERT INTO REACT

//  let title = $("#searchByTitle").val()
// ​
// ​
//     let defaultUrl = 'http://www.omdbapi.com/?apikey=a0bbf946&t='
// ​
//     let queryUrl = defaultUrl;
// ​
//     if (title !== ''){
//         queryUrl = queryUrl.concat(title)
//     }   else if (title === ''){
//         alert('please enter a valid title')
//     }
// ​
//     let settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": queryUrl,
//         "method": "GET",
//     }
// ​
//     $.ajax(settings).done(function (response) {
//         queryUrl = defaultUrl;
//         $("#searchByTitle").val(null)
//         console.log(response)
// });
// ​
// ​
// ​
// ​
// ​
// ​
// ​
// ​
// ​
// ​
// ​
// ​
// ​
// });
// });