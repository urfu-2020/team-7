import {APP_CLOSE_CHAT, APP_OPEN_CHAT, APP_TO_FULL, APP_TO_MOBILE} from "../types";

const initialState = {
  isMobile: true,
  isMenuOpen: true
}

export const mobileReducer = (state = initialState,  action) => {
  switch (action.type) {
    case APP_TO_MOBILE: {
      return {isMobile: true, isMenuOpen: true}
    }
    case APP_TO_FULL:
      return {...state, isMobile: false}
    case APP_CLOSE_CHAT:
      return {...state, isMenuOpen: true}
    case APP_OPEN_CHAT:
      return {...state, isMenuOpen: false}
    default: return state
  }
}
