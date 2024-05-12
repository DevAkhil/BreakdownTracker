import { FETCH_ALL_DATA_FAILURE, FETCH_ALL_DATA_SUCCESS, FETCH_BYREF_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, OPEN_POPUP, POST_ADD_ACC, POST_UPDATE_ACC, PUT_UPDATE_ACC } from "./ActionType";

export const fetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST
  });
  export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data
  });

  export const fetchAllDataSuccess = (data) => ({
    type: FETCH_ALL_DATA_SUCCESS,
    payload: data
  });
  
  export const fetchDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE,
    payload: error
  });
  export const fetchAllDataFailure = (error) => ({
    type: FETCH_ALL_DATA_FAILURE,
    payload: error
  });
  export const OpenPopup = () => ({
    type: OPEN_POPUP,
  });
  export const AddRequest = (data) => ({
    type: POST_ADD_ACC,
    payload: data
  });
  export const UpdateRequest = (data) => ({
    type: PUT_UPDATE_ACC,
    payload: data
  });

  export const fetchByRefSuccess = (data) => ({
    type: FETCH_BYREF_SUCCESS,
    payload: data
  });