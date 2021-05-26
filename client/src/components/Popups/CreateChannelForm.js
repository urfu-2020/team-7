import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../redux/selectors";
import {closePopup} from "../../redux/actions";

function CreateChannelForm(props) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const user = useSelector(getUser)
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    let errors = false;
    if (name.length === 0) {
      setNameError('Name of chat should be at least 1 character long :)')
      errors = true
    } else if (nameError.length > 0) {
      setNameError('')
    }
    if (errors || user === null) return
    props.socket.emit('createChannel', {name, owner: user.id})
    dispatch(closePopup());
  }
  return (
    <form className="popup__form" onSubmit={e => submitHandler(e)}>
      <label htmlFor="chatName" className="popup__field-title">
        How should we call it?
      </label>
      <input type="text" name="chatName" id="chatName" placeholder="Input chat name..." className="form__input"
             onChange={(e) => setName(e.target.value)} autoComplete="off"/>
      <span className="form__error-msg">
        {nameError}
      </span>
      <input type="submit" value="Create!" className="form__submit-btn"/>
    </form>
  );
}

export default CreateChannelForm;
