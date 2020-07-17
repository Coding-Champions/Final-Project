import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from "../../utils/API";
import Axios from 'axios';


export const AddMovies = () => {
    
    const history = useHistory();
    const [searchMovie, setSearchMovie] = useState('');
    const [movieData, setMovie] = useState({});
    //const [password, setPassword] = useState("");*/
    
    const searchMovies = query =>{
        API.search(query)
        .then((res)=>{
            console.log(res.data);
        });
    }

    const submit = e =>{
        e.preventDefault();
        searchMovies("Shrek");
    }

  return (
    <div>
      <div className='field'>
        <p className='control has-icons-left has-icons-right'>
          <input
            className='input'
            type='text'
            placeholder='Movie Name'
            onChange={(e) => setSearchMovie(e.target.value)}
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
