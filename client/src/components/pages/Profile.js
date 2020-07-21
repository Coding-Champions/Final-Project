import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';
// import Navbar from "../Navbar";

//useState renders every time the Profile component is ran.

export const Profile = () => {
    const history = useHistory();
    const [username, setName] = useState('');
    const [showList, setshowList] = useState(null);
    const [friendsList, setfriendList] = useState(null);
    console.log(friendsList);

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
            setfriendList(res.data);  //the data in the response is the message from the back end.
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
            <button className="button" type="submit" onClick={logoutUser}>Logout</button>
            <h1 style={{color: "white"}}>Hello {username} !!!</h1>
            
            <Link to="/AddMovies">
                <button className="button">Click Here to Add movies to your collections!</button>
            </Link>
            <div className="movie-details">
                <h1>Shows:</h1>
                {showList ? showList.map(movie=>
                <li><img src={movie.Poster}/></li>
                ) : <li>No movies here</li>}
            </div>
            <div className="movie-list">
                <h1>Friends:</h1>
                {friendsList ? friendsList.map(friend=>
                
                <a href= {"friend/" + friend.id} > <button className="button">{friend.name}</button></a> 
                ) : <li>No friends here</li>}
            </div>
        </>
    )
}

export default Profile;