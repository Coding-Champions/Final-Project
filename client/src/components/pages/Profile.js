import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';
import Navbar from "../Navbar"

//useState renders every time the Profile component is ran.

export const Profile = () => {
    const history = useHistory();
    const [username, setName] = useState('');
    const [showList, setshowList] = useState(null);
    const [friendsList, setfriendList] = useState(null);
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
            getFriends();
        }
    }, []); 
    const getFriends = ()=>{
        Axios({
            method: "GET",
            url: '/users/getfriends'
        }).then(res=>{
            console.log(res.data);  //the data in the response is the message from the back end.
        })
    }
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
                    <Navbar/>
            <div className="columns is-centered">
                <div className="profile-container">
                    <div className="box">

                    <h1 style={{color: "white"}}>Hello {username} !!!</h1>
                    </div>
                    <Link to="/AddMovies">
                        <button className="button is-primary">Click Here to Add movies to your collections!</button>
                    </Link>
                    <div className="box">

                    
                    <div className="movie-details">
                        {showList ? showList.map(movie=>
                            <>
                            <li className="user-movie-title">{movie.Title}</li>
                            <li><img src={movie.Poster}/></li>
                            </>
                        ) : <>No  movies here</>}
                    </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default Profile;

//Maybe used later

// {/* <h3>Title: {movieData.Title}</h3> 
//         <h3>Genre: {movieData.Genre}</h3> 
//         <h3>Poster: {movieData.Poster}</h3> 
//         <h3>imdbRating: {movieData.imdbRating}</h3> */}
