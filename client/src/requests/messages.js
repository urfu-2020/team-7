import {
  fetchMessagesFailure,
  fetchMessagesRequest,
  fetchMessagesSuccess, sendMessageFailure,
  sendMessageRequest,
  sendMessageSuccess, showPopup
} from "../redux/actions";
const axios = require('axios');

export function fetchMessages(type, id, owner) {
  return function(dispatch) {
    dispatch(fetchMessagesRequest({type: type, id: id, owner: owner}))

    if (type === 'USER') {
      dispatch(fetchMessagesSuccess([]));
    }
    else {
      axios.get(`/api/messages/${id}`, {withCredentials: true})
        .then(r => {
          const processed = []
          for (let i = 0; i < r.data.length; i += 1) {
            const msg = r.data[i];
            if (processed.length === 0 || processed[processed.length - 1].user.username !== msg.user.username) {
              processed.push({user: msg.user, messages: [msg]})
            }
            else {
              processed[processed.length - 1].messages.push(msg)
            }
          }
          dispatch(fetchMessagesSuccess(processed));
        })
        .catch(err => {
          dispatch(fetchMessagesFailure(err.message));
        })
    }
  }
}

export function sendMessage(data) {
  return function(dispatch) {
    dispatch(sendMessageRequest())
    axios.post('/api/messages/', data, {withCredentials: true})
      .then(() => {
        dispatch(sendMessageSuccess())
      }).catch(err => {
        dispatch(sendMessageFailure(err.message));
        dispatch(showPopup('ERROR ON SENDING', err.message))
    });
  }
}
