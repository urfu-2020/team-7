import {APP_LOGIN_USER, APP_LOGOUT_USER} from "../types";

const initialState = {
  user: null,
  logged: false,
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
    default: return state
  }
}
