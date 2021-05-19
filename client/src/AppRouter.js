import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login/Login.js';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "./redux/actions";
import MainPage from "./components/MainPage/MainPage";

function AppRouter() {
  const dispatch = useDispatch();
  const logoutUrl = `/auth/logout`
  const app = useSelector(state => state.app)
  useEffect(() => {
    dispatch(checkAuth())
  })

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {app.logged ? <MainPage /> : <Login /> }
        </Route>
        <Route exact path='/login'>
          {app.logged ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path='/logout' component={() => {
          window.location.href = logoutUrl;
          return null;
        }}/>
      </Switch>
    </Router>
  );
}

export default AppRouter;
