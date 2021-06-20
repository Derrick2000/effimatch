import {SET_CURRENT_USER, USER_LOADING} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

interface UserData {
  email: string;
  password: string;
}

const AUTH_URL = 'http://localhost:8080/login';

export const loginUser = (userData: UserData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(AUTH_URL, userData)
      .then(res => {
        // Set token to localStorage
        const token = res.headers.authorization; // the jwt token
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        console.log(decoded);
        // Set current user
        setCurrentUser(decoded);
        resolve('success');
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
};

// Set logged in user
export const setCurrentUser = (decoded: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch: any) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken('');
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
