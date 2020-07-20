import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

//useState renders every time the Profile component is ran.

export const Profile = () => {
    const history = useHistory();
    const [username, setName] = useState('');
    const [showList, setshowList] = useState(null);
    console.log(showList);

    useEffect(()=>{
        
        if(localStorage.usertoken === null){
            history.push('./login');
        }else {
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token)
            console.log(decoded);
            setName(decoded.name);
            getListOfMovs();
        }
    }, []); 
    
    //use state running twice.
    const getListOfMovs = ()=>{
        console.log("calling getMOvies")
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        console.log(decoded); 
       Axios({
        method: 'POST',
        data: {"email":decoded.email},
        url: '/users/getmovies'
      }).then(res=>{
          setshowList(res.data.showList);
      })
    }
    const logoutUser = e=>{
        e.preventDefault();
        localStorage.removeItem('usertoken');
        history.push('./login');
    }
    return ( 
        <>
        
        <button className="button" type="submit" onClick={logoutUser}>Logout</button>
        <h1 style={{color: "white"}}>Hello {username} !!!</h1>
        
        <Link to="/AddMovies">
            <button className="button">Click Here to Add movies to your collections!</button>
        </Link>
        <div className="movie-details">
        {showList ? showList.map(movie=>
            <li>{movie.Title}</li>
        ) : <li>No movies here</li>}
      </div>
        </>
    )
}

export default Profile;