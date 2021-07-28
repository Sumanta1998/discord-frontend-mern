import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";
import { combineReducers } from "redux";

const reducers = combineReducers({
  user: userReducer,
  app: appReducer
});

export default reducers;
