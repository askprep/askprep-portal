import Immutable from 'seamless-immutable';
import SET_USER_DETAILS from '../Actions/userManagement/ActionTypes';

const INITIAL_STATE = Immutable({
  userDetails: null,
});

export const UserManagementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};
