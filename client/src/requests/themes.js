import {switchTheme} from "../redux/actions";

const axios = require('axios');

export function switchThemeChain(id, theme) {
  return function(dispatch) {
    dispatch(switchTheme(theme))
    axios.put(`/api/users/${id}`, {theme}, {withCredentials: true});
  }
}
