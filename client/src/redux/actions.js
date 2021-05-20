import {FETCH_CHATS_FAILURE, FETCH_CHATS_REQUEST, FETCH_CHATS_SUCCESS, REQUEST_AUTH} from "./types";

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
