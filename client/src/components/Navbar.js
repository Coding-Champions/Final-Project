import React from 'react'


//have to add functions for hamburger menu click(toggle-open/close)

function Navbar() {
    return (
        <div>
            <div className="navbar-container">
                <navbar className="navbar is-dark" role="navigation" aria-label="main-navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                        <strong><h1>SceneIt</h1></strong>
                        </a>
                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <a href="https://www.google.com" className="navbar-item">
                                Home
                            </a>
                            <a href="https://www.google.com" className="navbar-item">
                                My List
                            </a>

                            <div className="navbar-item has-dropdown is-hoverable">
                                <a href="https://www.google.com" className="navbar-link">
                                    More
                                </a>
                                <div className="navbar-dropdown">
                                    <a href="https://www.google.com" className="navbar-item">
                                        Profile
                                    </a>
                                    <a href="https://www.google.com" className="navbar-item">
                                        Settings
                                    </a>
                                </div>
                            </div>

                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <div className="buttons">
                                        <a href="https://www.google.com" className="button is-primary">
                                            Login
                                        </a>
                                        <a href="https://www.google.com" className="button is-light">
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </navbar>
            </div>
        </div>
    )
}

export default Navbar
