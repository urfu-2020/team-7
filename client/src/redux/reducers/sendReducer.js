import {SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS} from "../types";

const initialState = {
  sending: false,
  error: ''
}

export const sendReducer = function(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST: {
      return {sending: true, error: ''}
    }
    case SEND_MESSAGE_SUCCESS: {
      return {sending: false, error: ''}
    }
    case SEND_MESSAGE_FAILURE: {
      return {sending: false, error: action.payload}
    }
    default: return state
  }
}
