import React from "react";
import {Link} from "react-router-dom"

const Home = () =>{
    return (
        <>
        <Link to="/login">
        <button className="button">Login</button>
        </Link>
        <Link to="/register">
        <button className="button">Register</button>
        </Link>
        </>
    )
 }
export default Home;