import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import API from "../../utils/API";
import Axios from 'axios';


export const AddMovies = () => {
    
    const history = useHistory();
    const [movieName, setMovieName] = useState('');
    const [movieData, setMovie] = useState(null);
    //console.log(movieData);
    const searchMovies = query =>{
        API.search(query)
        .then((res)=>{  //Why the heck does it lag behind one???
            setMovie(res.data);
        });
    }

    useEffect(()=>{
      console.log(movieData);
    }, [movieData]);
    const submit = e =>{
        e.preventDefault();
        searchMovies(movieName);
    } 
    const submitToDB = e=>{
      if(!localStorage.usertoken){
        history.push('./login');
      }else {
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
        }).then(res=>{ 
          console.log(res); //res contains the message movie's been added.
          alert("Movie has been added");
        })
      }
    }
  return (
    <div>
      <Link to="/Profile">
            <button className="button">Back to Profile</button>
        </Link>
              <button className="button" type="submit" onClick = {submitToDB}>Add Movie</button>

      <div className='field'>
        <p className='control has-icons-left has-icons-right'>
          <input
            className='input'
            type='text'
            placeholder='Movie Name'
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
      <div className='field'>
        <p className='control'>
          <button className='button is-success' onClick={submit}>
            Search
          </button>
        </p>
      </div>
      <div className="movie-details">
      {movieData === null ? <h3>No movie to display</h3> : <><h3>Title: {movieData.Title}</h3> 
      <h3>Genre: {movieData.Genre}</h3> 
      <h3>Poster: {movieData.Poster}</h3> 
      <h3>imdbRating: {movieData.imdbRating}</h3></>}
      </div>
    </div>
  )
}

/*
<div className="text-center">
      <img alt={props.title} className="img-fluid" src={props.src} style={{ margin: "0 auto" }} />
      <h3>Director(s): {props.director}</h3>
      <h3>Genre: {props.genre}</h3>
      <h3>Released: {props.released}</h3>
    </div>

    heading={this.state.result.Title || "Search for a Movie to Begin"}
            >
              {this.state.result.Title ? (
                <MovieDetail
                  title={this.state.result.Title}
                  src={this.state.result.Poster}
                  director={this.state.result.Director}
                  genre={this.state.result.Genre}
                  released={this.state.result.Released}
                />
              ) : (
                <h3>No Results to Display</h3>
              )}
*/

export default AddMovies;
