import React, {useEffect} from 'react';
import MainPage from "../MainPage/MainPage";
import Login from "../Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "../../redux/actions";


function Index() {
  const dispatch = useDispatch();
  const app = useSelector(state => state.app)
  useEffect(() => {
    dispatch(checkAuth())
  })

  if (app.logged) {
    return <MainPage />
  }
  return <Login />
}

export default Index
