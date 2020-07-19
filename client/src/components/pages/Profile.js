import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

export const Profile = () => {
    const history = useHistory();
    const [username, setName] = useState('');
    const [showList, setshowList] = useState(null);
    console.log(showList);

    useEffect(()=>{
        //hmm maybe run a get requse here?  In useEffect if it runs after setstate?
        if(localStorage.usertoken === null){
            history.push('./login');
        }else {
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token)
            console.log(decoded);
            setName(decoded.name);
            getListOfMovs();
            //console.log(user);
        }
    }, []); 
    //does not work if it is a get request?!?!?  Why is it sending to localhost:3000?
    //try post man, also look up usestate and useeffect and how to use useeffect to fix 
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
    //getListOfMovs();
    return ( 
        <>
        
        <button className="button" type="submit">Logout</button>
        <h1 style={{color: "white"}}>Hello {username} !!!</h1>
        
        <Link to="/AddMovies">
            <button className="button">Click Here to Add movies to your collections!</button>
        </Link>
        <div className="movie-details">
        {showList ? showList.map(movie=>
            <li>{movie.Title}</li>
        ) : <>No  movies here</>}
      </div>
        </>
    )
}
{/* <h3>Title: {movieData.Title}</h3> 
        <h3>Genre: {movieData.Genre}</h3> 
        <h3>Poster: {movieData.Poster}</h3> 
        <h3>imdbRating: {movieData.imdbRating}</h3> */}
export default Profile;