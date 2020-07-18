import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export const Profile = () => {
    const history = useHistory();
    const [username, setName] = useState('');

    useEffect(()=>{
        if(!localStorage.usertoken){
            history.push('./login');
        }else {
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token)
            console.log(decoded);
            setName(decoded.name);
        }
    }, []);
   
    return ( 
        <>
        
        <button className="button" type="submit">Logout</button>
        <h1 style={{color: "white"}}>Hello {username} !!!</h1>
        
        <Link to="/AddMovies">
            <button className="button">Click Here to Add movies to your collections!</button>
        </Link>
        </>
    )
}

export default Profile;