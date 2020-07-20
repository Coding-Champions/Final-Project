import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import AddMovies from './components/pages/AddMovies';
import Friend from './components/pages/Friend';
import './App.css';

function App() {
  AOS.init();

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path = '/' component={Home} />
          <Route exact path = '/login' component={Login} />
          <Route exact path = '/register' component={Register} />
          <Route exact path = '/profile' component={Profile} />
          <Route exact path = '/addmovies' component={AddMovies} />
          <Route path = '/friend/:id' component={Friend} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
