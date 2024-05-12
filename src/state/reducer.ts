import swap from './swap/reducer';
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  swap,
});

export default reducer;
