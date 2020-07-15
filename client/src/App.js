import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path = '/' component={Home} />
          <Route exact path = '/login' component={Login} />
          <Route exact path = '/register' component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
