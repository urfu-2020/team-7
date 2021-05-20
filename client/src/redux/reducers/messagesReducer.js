import {FETCH_CHATS_FAILURE, FETCH_MESSAGES_START, FETCH_MESSAGES_SUCCESS} from "../types";

const initialState = {
  loading: true,
  type: null,
  id: null,
  messages: [],
  error: '',
  owner: null
}

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_START: {
      return {...action.payload, loading: true, error: '', messages: []}
    }
    case FETCH_MESSAGES_SUCCESS: {
      return {...state, messages: action.payload, loading: false,}
    }
    case FETCH_CHATS_FAILURE: {
      return {...state, error: action.payload, loading: false}
    }
    default: return state
  }
}

