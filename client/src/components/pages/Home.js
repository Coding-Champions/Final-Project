import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {Link} from "react-router-dom"

const Home = () =>{
    return (
        <>
            <div data-aos="zoom-in" data-aos-duration="1500">
                <div className="carding">
                    <div className="carding-title">
                        <h3 className="home-title">Welcome to SceneIt</h3>
                    </div>
                    <Link to="/login">
                        <button className="button">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="button">Register</button>
                    </Link>
                </div>
            </div>
        </>
    )
 }
export default Home;