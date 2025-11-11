import {
  IDENTIFY_USER_EXIST_ON_DEVICE_FAIL,
  IDENTIFY_USER_EXIST_ON_DEVICE_START,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_START,
  LOGOUT_SUCCESS, RESET_STATE,
} from '../actionConstants';
import {persistor} from '../store/configureStore';

export const loginStart = payload => async dispatch => {
  dispatch({
    type: LOGIN_START,
    payload: payload,
  });
};

export const loginSuccess = payload => async dispatch => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: payload,
  });
};

export const loginFailure = payload => async dispatch => {
  console.log('login fail auth action>>>>', payload);
  dispatch({
    type: LOGIN_FAILURE,
    payload: payload,
  });
};

export const logoutStart = () => async dispatch => {

  try {
    dispatch({type: LOGOUT_START});
    // Purge persisted store to clear local storage
    await persistor.purge();
    dispatch({type: LOGOUT_SUCCESS});
  } catch (error) {
    dispatch({type: LOGOUT_FAIL, payload: error.message});
  }
};

export const logoutSuccess = payload => async dispatch => {
  console.log('logoutSuccess auth action>>>>', payload);
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: payload,
  });
};

export const logoutFail = payload => async dispatch => {
  console.log('logoutFail auth action>>>>', payload);
  dispatch({
    type: LOGOUT_FAIL,
    payload: payload,
  });
};

export const identifyUserExistOnDeviceStart = () => dispatch => {
  console.log('identifyUserExistOnDeviceStart auth action>>>>');
  dispatch({
    type: IDENTIFY_USER_EXIST_ON_DEVICE_START,
  });
};

export const identifyUserExistOnDeviceSuccessful = payload => dispatch => {
  console.log('identifyUserExistOnDeviceSuccessful auth action>>>>', payload);
  dispatch({
    type: IDENTIFY_USER_EXIST_ON_DEVICE_START,
    payload: payload,
  });
};

export const identifyUserExistOnDeviceFail = payload => dispatch => {
  console.log('identifyUserExistOnDeviceFail auth action>>>>', payload);
  dispatch({
    type: IDENTIFY_USER_EXIST_ON_DEVICE_FAIL,
    payload: payload,
  });
};

export const resetState = () => async dispatch => {
  dispatch({
    type: RESET_STATE,
  });
};
