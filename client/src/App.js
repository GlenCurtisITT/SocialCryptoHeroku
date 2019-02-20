import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import NavBar from './components/NavBar/NavBar'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import FlashMessageList from './components/FlashMessagesList/FlashMessagesList'

import 'bootstrap/dist/css/bootstrap.min.css'

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <React.Fragment>
              <NavBar/>
                <div className="container">
                    <FlashMessageList/>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={ Register } />
                    <Route exact path="/login" component={ Login } />
                </div>
            </React.Fragment>
          </Router>
        </Provider>
    );
  }
}

export default App;
