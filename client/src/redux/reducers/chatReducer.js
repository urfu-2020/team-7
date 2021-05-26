import {
  ADD_CHAT,
  FETCH_CHATS_FAILURE,
  FETCH_CHATS_REQUEST,
  FETCH_CHATS_SUCCESS,
  UPDATE_CHAT_TO_UNREAD,
  UPDATE_USER_TO_CHAT
} from "../types";

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
    case UPDATE_USER_TO_CHAT: {
      const uIds = action.payload.users.length > 0
        ? action.payload.users.map((user) => user.id)
        : [];
      const users = state.users.filter(u => !uIds.includes(u.id));
      const mates = action.payload.users.filter(u => u.id !== action.payload.selfId);
      const mate = mates.length > 0 ? mates[0] : null;
      const chats = state.chats.concat([{...action.payload.chat, user: mate}]);
      return {...state, users, chats}
    }
    case UPDATE_CHAT_TO_UNREAD: {
      return {...state, chats: state.chats.map(chat => {
        return chat.id === action.payload
          ? {...chat, unread: true}
          : chat
        })}
    }
    case ADD_CHAT: {
      const chats = state.chats.concat([action.payload])
      return {...state, chats}
    }
    default: return state
  }
}


