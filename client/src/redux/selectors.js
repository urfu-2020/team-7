export const getLogged = (state) => state.app.logged;
export const getChats = (state) => state.chats;
export const getUser = (state) => state.app.user;
export const getMessages = (state) => state.messages;
export const getTheme = (state) => state.user ? state.user.theme : state.app.theme;
export const getPopup = (state) => state.popup;
export const getSearchFilter = (state) => state.filter.searchInput
