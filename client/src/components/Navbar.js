import React from 'react';
import { Link, useHistory } from 'react-router-dom';



//have to add functions for hamburger menu click(toggle-open/close)

function Navbar() {
    const history = useHistory();

    const logoutUser = e=>{
        e.preventDefault();
        localStorage.removeItem('usertoken');
        history.push('./login');
    }


    return (
        <div>
            <div className="navbar-container">
                <navbar className="navbar is-dark" role="navigation" aria-label="main-navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                        <strong><h1>SceneIt</h1></strong>
                        </a>
                        <a role="button" className="navbar-burger burger is-light" aria-label="menu" aria-expanded="true" >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">                                  
                                <button className="button" type="submit" onClick={logoutUser}>Logout</button>
                            </div>
                        </div>
                    </div>
                </navbar>
            </div>
        </div>
    )
}

export default Navbar
