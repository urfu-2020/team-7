import {APP_LOGIN_USER, APP_LOGOUT_USER, SWITCH_THEME} from "../types";

const initialState = {
  user: null,
  logged: false,
  theme: window.matchMedia("(prefers-color-scheme: dark)") ? "DARK" : "LIGHT"
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOGIN_USER:
      if (action.payload.logged !== state.logged) {
        return {...state, logged: action.payload.logged, user: action.payload.user}
      }
      return state
    case APP_LOGOUT_USER:
      if (state.logged) return {...state, logged: false, user: null}
      return state
    case SWITCH_THEME:
      return {...state, theme: action.payload, user: {...state.user, theme: action.payload}}
    default: return state
  }
}
