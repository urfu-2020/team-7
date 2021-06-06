import {
  ADD_MESSAGE, APP_SEND_NOTIFICATION,
  CHANGE_USER_TO_DIALOG,
  FETCH_CHATS_FAILURE,
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS
} from "../types";

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
    case ADD_MESSAGE: {
      if (state.id === action.payload.message.chatId) {
        let messages = [];
        if (state.messages.length === 0 ||
          state.messages[state.messages.length - 1].user.username !== action.payload.user.username) {
          messages = state.messages.concat([{
            user: {name: action.payload.user.name, username: action.payload.user.username},
            messages: [action.payload.message]
          }]);
        }
        else {
          messages.push.apply(messages, state.messages);
          messages[messages.length - 1].messages.push(action.payload.message)
        }
        return {...state, messages: messages}
      }
      return state
    }
    case CHANGE_USER_TO_DIALOG:
      if (state.type === 'USER' && action.payload.users.filter(u => u.id === state.id)) {
        return {
          loading: false,
          type: action.payload.chat.type,
          id: action.payload.chat.id,
          owner: action.payload.chat.owner,
          messages: [],
          error: '',
        }
      }
      return state
    case APP_SEND_NOTIFICATION:
      if (action.payload.message.chatId !== state.id  && ('Notification' in window)) {
        const title = `[Kilogram]: Message from ${action.payload.user.name || action.payload.user.username}`;
        const options = {
          body: action.payload.message.content,
          icon: '/logo192.png',
          vibrate: [200, 100, 200]
        }
        new Notification(title, options);
      }
      return state
    default: return state
  }
}

