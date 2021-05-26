import {fetchChatsFailure, fetchChatsRequest, fetchChatsSuccess} from "../redux/actions";

const axios = require('axios');

export async function fetchChatss (id) {
  const url = `/api/chats/getAllChats/${id}`
  return await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  })
    .then(r => {
      if (r.status === 200) return r.json();
      throw new Error('Bad response')
    })
    .catch(() => {
      return {chats: [], users: []}
    });
}

export function fetchChats(id) {
  return function(dispatch) {
    dispatch(fetchChatsRequest())
    axios.get(`/api/chats/getAllChats/${id}`, {withCredentials: true})
      .then(r => {
        dispatch(fetchChatsSuccess({users: r.data.users, channels: r.data.channels,
          chats: r.data.chats.map(chat => {
            chat.unread = false;
            return chat;
          })}))
      })
      .catch(e =>{
        dispatch(fetchChatsFailure(e.message))
      })

  }
}

