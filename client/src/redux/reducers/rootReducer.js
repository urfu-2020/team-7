import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {chatReducer} from "./chatReducer";
import {messagesReducer} from "./messagesReducer";
import {popupReducer} from "./popupReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  chats: chatReducer,
  messages: messagesReducer,
  popup: popupReducer
})
