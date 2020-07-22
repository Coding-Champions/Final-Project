import React, {useState, useEffect} from 'react';
import {Link, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';


const Friend = () =>{
    const { id } = useParams();
    const [showList, setshowList] = useState(null);
    const [friendName, setfriendName] = useState("");
    const [friendShow, setfriendShow] = useState(null)
    console.log(friendName);
    console.log(showList);
    useEffect(()=>{
        getFriendInfo();
    }, []);
    //Why doesnt a get request work?!?!?!
    const getFriendInfo = ()=>{
        console.log("Running get friend front end")
        Axios({
            method: "POST",
            data:{
                "id": id, 
            },
            url: '/users/getonefriend'
        }).then(res=>{
            setfriendName(res.data.name);  //the data in the response is the message from the back end.
            setfriendShow(res.data.showList);
        })
    }


    
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
        console.log(res.data.showList);
      })
    }


    //Now should be ok. Since we are not allowing users to add null movie.  So clean database and rerun everything!!
    return (
        <>
        <div className="container">
            
            <Link to="/profile">
                <button className="button">Back to Profile</button>
            </Link>
            
            <div className="friend-title" style={({ color: 'white' }, { textTransform: 'capitalize' })}>
                {friendName ? <div>{friendName}'s Shows</div> : <li>No show here</li>}
            </div>
            <div className='movie-details'>
            {friendShow ? friendShow.map(friend=> <img className='watchlist-img' src={friend.Poster}/>) : <li>Friend currently does not have any shows</li>}
            </div>
            </div>
        </>
    )
 }

 export default Friend;