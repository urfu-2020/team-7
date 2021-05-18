import React, {Component} from 'react';
import MainPage from "../MainPage/MainPage";
import Login from "../Login/Login";

class Index extends Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_SERVER_HOME_URL}:${process.env.REACT_APP_SERVER_PORT}/auth/login/success`
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      authenticated ? <MainPage /> : <Login />
    );
  }
}

export default Index;
