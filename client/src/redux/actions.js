import {
  ADD_MESSAGE, CHANGE_USER_TO_DIALOG,
  FETCH_CHATS_FAILURE,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS, FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_START, FETCH_MESSAGES_SUCCESS,
  REQUEST_AUTH, SWITCH_THEME, UPDATE_CHAT_TO_UNREAD, UPDATE_USER_TO_CHAT
} from "./types";

export function checkAuth() {
  return {type: REQUEST_AUTH}
}

export function fetchChatsRequest() {
  return {type: FETCH_CHATS_REQUEST}
}

export function fetchChatsSuccess(users) {
  return {type: FETCH_CHATS_SUCCESS, payload: users}
}

export function fetchChatsFailure(msg) {
  return {type: FETCH_CHATS_FAILURE, payload: msg}
}

export function fetchMessagesRequest(load) {
  return {
    type: FETCH_MESSAGES_START,
    payload: load
  }
}

export function fetchMessagesFailure(msg) {
  return {
    type: FETCH_MESSAGES_FAILURE,
    payload: msg
  }
}

export function fetchMessagesSuccess(messages) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: messages
  }
}

export function receiveMessage(data) {
  return {
    type: ADD_MESSAGE,
    payload: data
  }
}

export function updateUserToChats(id, data) {
  return {
    type: UPDATE_USER_TO_CHAT,
    payload: {...data, selfId: id}
  }
}

export function changeUserToDialog(load) {
  return {
    type: CHANGE_USER_TO_DIALOG,
    payload: load
  }
}

export function setUnread(chatId) {
  return {
    type: UPDATE_CHAT_TO_UNREAD,
    payload: chatId
  }
}

export function switchTheme(theme) {
  return {
    type: SWITCH_THEME,
    payload: theme
  }
}

export function switchThemeChain(id, theme) {
  return function(dispatch) {
    dispatch(switchTheme(theme))
  }
}
