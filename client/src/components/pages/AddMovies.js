import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import API from "../../utils/API";
import Axios from 'axios';
// import Addedmodal from "../Addedmodal"


export const AddMovies = () => {

  const history = useHistory();
  const [movieName, setMovieName] = useState('');
  const [movieData, setMovie] = useState(null);
  //console.log(movieData);
  const searchMovies = query => {
    API.search(query)
      .then((res) => {  //Why the heck does it lag behind one???
        setMovie(res.data);
      });
  }

  useEffect(() => {
    console.log(movieData);
  }, [movieData]);

  const submit = e => {
    e.preventDefault();
    searchMovies(movieName);
  }

  const submitToDB = e => {
    if (!localStorage.usertoken) {
      history.push('./login');
    } else {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token)
      //console.log(decoded);
      Axios({
        method: "POST",
        data: {
          "email": decoded.email,
          "movieData": movieData,
        },
        url: "/users/addmovie",
      }).then(res => {
        console.log(res); //res contains the message movie's been added.
        alert("Movie has been added");
      })
    }
  }


  return (
    <div>
      <div className="rows is-centered">
        <div>
          
        <div className="addmovies-container">
          <div className="movies-button-container">

            <Link to="/Profile">
              <button className="button is-primary">Back to Profile</button>
            </Link>
            <button className="button is-primary" type="submit" onClick={submitToDB}>Add Movie</button>
          </div>
          <div className="searchbar-container">

            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input'
                  type='text'
                  placeholder='Search Movies/Tv series here'
                  onChange={(e) => setMovieName(e.target.value)}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-envelope' />
                </span>
                <span className='icon is-small is-right'>
                  <i className='fas fa-check' />
                </span>
              </p>
            </div>
          </div>
          <div className='field'>
            <p className='control'>
              <button className='button is-primary' onClick={submit}>
                Search
              </button>
            </p>
          </div>
          <div className="search-results">
            <div className="movie-details">
              {movieData === null ? <h3>Nothing to Display</h3> : <><h3>Title: {movieData.Title}</h3>
                <img src={movieData.Poster}/>
                <h3><strong>Genre: {movieData.Genre}</strong></h3>
                <h3>imdbRating: {movieData.imdbRating}</h3></>}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AddMovies;
