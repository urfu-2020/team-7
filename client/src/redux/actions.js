import {
  ADD_CHANNEL,
  ADD_CHAT,
  ADD_MESSAGE,
  CHANGE_USER_TO_DIALOG,
  CLOSE_POPUP,
  FETCH_CHATS_FAILURE,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS,
  REQUEST_AUTH, SEARCH_FILTER_UPDATE, SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SHOW_POPUP,
  SWITCH_THEME,
  UPDATE_CHAT_TO_UNREAD,
  UPDATE_USER_TO_CHAT
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

export function closePopup() {
  return {
    type: CLOSE_POPUP
  }
}

export function showPopup(title, content) {
  return {
    type: SHOW_POPUP,
    payload: {title, content}
  }
}

export function addNewChat(data) {
  return {
    type: ADD_CHAT,
    payload: data
  }
}

export function addNewChannel(data) {
  return {
    type: ADD_CHANNEL,
    payload: data
  }
}

export function sendMessageRequest() {
  return {
    type: SEND_MESSAGE_REQUEST
  }
}

export function sendMessageSuccess() {
  return {
    type: SEND_MESSAGE_SUCCESS
  }
}

export function sendMessageFailure(message) {
  return {
    type: SEND_MESSAGE_FAILURE,
    payload: message
  }
}

export function searchUpdate(input) {
  return {
    type: SEARCH_FILTER_UPDATE,
    payload: input
  }
}
