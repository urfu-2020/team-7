import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {chatReducer} from "./chatReducer";
import {messagesReducer} from "./messagesReducer";
import {popupReducer} from "./popupReducer";
import {sendReducer} from "./sendReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  chats: chatReducer,
  messages: messagesReducer,
  popup: popupReducer,
  sender: sendReducer
})
