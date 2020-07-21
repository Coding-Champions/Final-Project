import React, {useState, useEffect} from 'react';
import {Link, useParams } from 'react-router-dom';
import Axios from 'axios';


const Friend = () =>{
    const { id } = useParams();
    const [friendName, setfriendName] = useState("");
    const [friendShow, setfriendShow] = useState(null)
    console.log(friendName);
    console.log(friendShow);
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
    //Now should be ok. Since we are not allowing users to add null movie.  So clean database and rerun everything!!
    return (
        <>
        <Link to="/profile">
            <button className="button">Back to Profile</button>
        </Link>
        <div>
         {friendName ? 
          <h1>{friendName}'s Shows</h1> : <li>No show here</li>}
        </div>
        {friendShow ? friendShow.map(friend=>
            
            <h1>{friend.Title}</h1>
          
        ) : <li>Friend currently does not have any shows</li>}
        </>
    )
 }

 export default Friend;