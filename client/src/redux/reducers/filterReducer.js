import {SEARCH_FILTER_UPDATE} from "../types";

const initialState = {
  searchInput: ''
}

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FILTER_UPDATE:
      return {searchInput: action.payload}
    default: return state
  }
}
