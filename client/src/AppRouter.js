import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from './components/Index/Index.js';
import Login from './components/Login/Login.js';

function AppRouter(props) {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Index}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </Router>
  );
}

export default AppRouter;
