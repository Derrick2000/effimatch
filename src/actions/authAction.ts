import {SET_CURRENT_USER, USER_LOADING} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

interface UserData {
  email: string;
  password: string;
}

const AUTH_URL = `${process.env.REACT_APP_API_ENDPOINT}/v1/authentication/login`;
const OWN_INFO_URL = `${process.env.REACT_APP_API_ENDPOINT}/v1/users/get-own`;

export const loginUser = (userData: UserData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(AUTH_URL, userData)
      .then(async res => {
        // Set token to localStorage
        const token = res.data.data.token; // the jwt token
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        const userInfoResp = await axios.get(OWN_INFO_URL);
        localStorage.setItem(
          'userInfo',
          JSON.stringify(userInfoResp.data.data),
        );

        setCurrentUser({...decoded, ...userInfoResp.data.data});
        resolve('success');
      })
      .catch(() => {
        reject();
      });
  });
};

// Set logged in user
export const setCurrentUser = (userinfo: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: userinfo,
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

  window.location.reload();
};
