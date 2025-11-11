import {merge} from 'lodash';

import {
  IDENTIFY_USER_EXIST_ON_DEVICE_FAIL,
  IDENTIFY_USER_EXIST_ON_DEVICE_START, IDENTIFY_USER_EXIST_ON_DEVICE_SUCCESSFUL,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  RESET_STATE,
} from '../actionConstants';

import {createReducer} from './reducerUtils';

const initialState = {
  user: {
    email: '',
    password: '',
    role: '',
    id: '',
  },
  login: {
    email: '',
    error: {message: '', error: '', errorCode: ''},
  },
  tokenData: '',
  loggedIn: false,
};

const loginStart = (state = initialState, payload) => {
  return merge({}, state, {
    login: {error: {message: '', errorCode: '', error:''}, email: payload.email},
    user: {email: payload.email, password: payload.password}});
};

const loginSuccess = (state = initialState, payload) => {
  return merge({}, state, {
    loggedIn: true,
    tokenData: payload.token,
    login: {error: {message: '', errorCode: '', error:''}, email: payload.email},
    user: {email: payload.email, password: payload.password, role:payload.role, id: payload.id},
  });
};

const loginFailure = (state = initialState, payload) => {
  console.log('Login Fail auth Reducer>>', payload);
  return merge({}, state, {
    loggedIn: false,
    login: {error: {message:payload?.message, errorCode: '', error:payload?.error}, email: ''},
  });
}; 

const logoutSuccess = (state = initialState) => {
  return initialState;
};

const identifyUserExistOnDeviceStart = state => ({
  ...state,
  loading: true,
});

const identifyUserExistOnDeviceSuccessful = (state, payload) => {
  return {
    ...state,
    loggedIn: true,
    loading: false,
    user: payload,
    tokenData: payload?.token,
  };
};

const identifyUserExistOnDeviceFail = state => ({
  ...state,
  loggedIn: false,
  loading: false,
  user: null,
});

const resetAuthData = (state = initialState, payload) => {
  return initialState;
};

export default createReducer(initialState, {
  [LOGIN_START]: loginStart,
  [RESET_STATE]: resetAuthData,
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGIN_FAILURE]: loginFailure,
  [LOGOUT_SUCCESS]: logoutSuccess,
  [IDENTIFY_USER_EXIST_ON_DEVICE_START]: identifyUserExistOnDeviceStart,
  [IDENTIFY_USER_EXIST_ON_DEVICE_SUCCESSFUL]: identifyUserExistOnDeviceSuccessful,
  [IDENTIFY_USER_EXIST_ON_DEVICE_FAIL]: identifyUserExistOnDeviceFail,
});
