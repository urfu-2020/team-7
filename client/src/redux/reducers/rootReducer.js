import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {chatReducer} from "./chatReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  chats: chatReducer
})
