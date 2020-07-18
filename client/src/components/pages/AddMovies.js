import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from "../../utils/API";
import Axios from 'axios';


export const AddMovies = () => {
    
    const history = useHistory();
    const [movieName, setMovieName] = useState('');
    const [movieData, setMovie] = useState({});
    console.log(movieName);
    //const [password, setPassword] = useState("");*/
    //console.log(movieName);
    const searchMovies = query =>{
        API.search(query)
        .then((res)=>{  //Why the heck does it lag behind one???
            setMovie(res.data);
            //console.log(movieData);
            //console.log(movieName);
        });
    }

    useEffect(()=>{
      console.log(movieData);
    }, [movieData]);
    //Idea now: searchMovie will be updated and then moviedata is called when the search button is hit.  
    //Now there should not need to be a useeffect function in here.
    const submit = e =>{
        e.preventDefault();
        searchMovies(movieName);
    }
    
  return (
    <div>
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
    </div>
  )
}

export default AddMovies;
