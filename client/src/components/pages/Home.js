import React from 'react';
import {Link} from 'react-router-dom';
 const Home = () =>{
    return (
        <>
        <Link to="/login">
            <li className="nav-item nav-link">Login</li>
        </Link>
        <Link to="/register">
            <li className="nav-item nav-link">Register</li>
        </Link>
        </>
) 
 }   

export default Home;