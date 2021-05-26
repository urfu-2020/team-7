import {CLOSE_POPUP, SHOW_POPUP} from "../types";

const initialState = {
  shouldShow: false,
  content: null,
  title: ''
}

export const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_POPUP:
      return {shouldShow: false, content: null, title: ''}
    case SHOW_POPUP:
      return {...action.payload, shouldShow: true}
    default: return state
  }
}
