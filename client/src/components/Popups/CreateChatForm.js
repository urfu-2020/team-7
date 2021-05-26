import React, {useState} from 'react';
import Select from 'react-select'
import {useDispatch, useSelector} from "react-redux";
import {getChats, getUser} from "../../redux/selectors";
import './form.css';
import {closePopup} from "../../redux/actions";

function CreateChatForm(props) {
  const styles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
    }),
    control: (provided) => ({
      ...provided,
      background: 'var(--input-bg)',
      color: 'black',
      borderColor: 'var(--input-holder)'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--input-holder)'
    })
  }
  const chats = useSelector(getChats);
  const options = []
  for (let i = 0; i < chats.chats.length; i++) {
    const chat = chats.chats[i];
    if (chat.type === 'DIALOG') {
      options.push({value: chat.user.id, label: `@${chat.user.username}`})
    }
  }
  for (let i = 0; i < chats.users.length; i++) {
    const user = chats.users[i];
    options.push({value: user.id, label: `@${user.username}`});
  }
  const [name, setName] = useState('');
  const [selected, setSelected] = useState([]);
  const [nameError, setNameError] = useState('');
  const [selectedError, setSelectedError] = useState('');
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
    if (selected.length < 2) {
      setSelectedError('You should choose at least 2 persons for a group chat...')
      errors = true
    } else if (selectedError.length > 0) {
      setSelectedError('')
    }
    if (errors || user === null) return
    const mates = selected.map(opt => opt.value);
    mates.push(user.id);
    props.socket.emit('createChat', {name, users: mates, owner: user.id})
    dispatch(closePopup());
  }

  const handleChange = (options) => {
    setSelected(options)
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
      <span className="popup__field-title">Who is joining us?</span>
      <Select options={options} isMulti={true} styles={styles} onChange={handleChange} />
      <span className="form__error-msg">
        {selectedError}
      </span>
      <input type="submit" value="Create!" className="form__submit-btn"/>
    </form>
  );
}

export default CreateChatForm;
