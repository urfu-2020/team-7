import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {chatReducer} from "./chatReducer";
import {messagesReducer} from "./messagesReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  chats: chatReducer,
  messages: messagesReducer
})
