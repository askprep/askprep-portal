import { combineReducers } from 'redux';
import { DashBoardReducer } from './Reducers/DashBoardReducer';

const appReducer = combineReducers({
  DashBoardReducer,
});

export default appReducer;
