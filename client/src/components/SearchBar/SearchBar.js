import React, {useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {searchUpdate} from "../../redux/actions";

function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const ref = useRef();
  const typeHandler = (e) => {
    setValue(e.target.value);
    dispatch(searchUpdate(e.target.value.trim()));
  }
  const clearInput = () => {
    setValue('');
    dispatch(searchUpdate(''));
    if (ref.current) ref.current.value = ''
  }
  return (
    <section className="main-window__search-container">
      <div className="main-window__search search">
        <label htmlFor="chat-search" className="search__label">
          <i className="fas fa-search"/>
        </label>
        <input type="text" name="chat-search" id="chat-search" className="search__search-bar"
               placeholder="Search" onChange={typeHandler} ref={ref}/>
        {value.length > 0 && <i className="fas fa-times search__clear" id="chat-search-clear"
                                onClick={clearInput}/>}
      </div>
    </section>
  );
}

export default SearchBar;
