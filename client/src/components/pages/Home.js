import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {Link} from "react-router-dom"

const Home = () =>{
    return (
        <>
            <div data-aos="zoom-in-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                 <div className="login-container">
                     <div className="columns is-centered">
                        <div className="card">
                            <header className="card-header">
                            <p className="card-header-title">
                            <h3><strong>Welcome to Scene It</strong></h3>
                            </p>
                            </header>
                            <div className="home-container">
                                <Link to="/login">
                                    <button className="button is-primary">Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="button is-primary">Register</button>
                                </Link>
                            </div>
                        </div>
                     </div>
                 </div>
             </div>
        </>
    )
 }
export default Home;