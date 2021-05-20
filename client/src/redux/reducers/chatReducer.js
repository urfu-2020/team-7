import {FETCH_CHATS_FAILURE, FETCH_CHATS_REQUEST, FETCH_CHATS_SUCCESS} from "../types";

const initialState = {
  chats: [],
  users: [],
  loading: true,
  error: ''
}

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS_REQUEST: {
      return {...state, loading: true}
    }
    case FETCH_CHATS_SUCCESS: {
      return {...action.payload, loading: false, error: ''}
    }
    case FETCH_CHATS_FAILURE: {
      return {...action.payload, loading: false, users: [], chats: []}
    }
    default: return state
  }
}


