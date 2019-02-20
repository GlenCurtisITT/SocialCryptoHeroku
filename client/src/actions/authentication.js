import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import {flashMessageAndDelete} from "./flashMessages";

export const registerUser = (user, history) => async dispatch => {
    let res = await axios.post(`http://localhost:3001/users/signup`, {
        email: user.email,
        password: user.password,
        passwordConf: user.password_conf
    });
    console.log(res.data.error);
    if(res.data.error){
        dispatch({
            type: GET_ERRORS,
            payload: res.data
        });
    }else{
        history.push('/login')
    }
};

export const loginUser = (user) => async dispatch => {
    let res = await axios.post(`http://localhost:3001/users/login`, {
        email: user.email,
        password: user.password
    });
    if(res.data.error){
        dispatch({
            type: GET_ERRORS,
            payload: res.data
        });
    }else {
       const token = res.data.token;
       localStorage.setItem("jwtToken", token);
       const decoded = jwt_decode(token);
       flashMessageAndDelete(dispatch, "success", "You have logged in successfully.");
       dispatch(setCurrentUser(decoded));
    }
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    flashMessageAndDelete(dispatch, "success", "You have logged out successfully.");
    dispatch(setCurrentUser({}));
    history.push('/');
}