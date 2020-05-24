import { SET_USER_DETAILS } from './ActionTypes';

export const setUserdetails = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_USER_DETAILS, payload: data });
  };
};
