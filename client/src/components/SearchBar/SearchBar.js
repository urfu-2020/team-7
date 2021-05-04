import React from 'react';

function SearchBar(props) {
  return (
    <section className="main-window__search-container">
      <div className="main-window__search search">
        <label htmlFor="chat-search" className="search__label">
          <i className="fas fa-search"/>
        </label>
        <input type="text" name="chat-search" id="chat-search" className="search__search-bar" placeholder="Search"/>
        <i className="fas fa-times search__clear" id="chat-search-clear"/>
      </div>
    </section>
  );
}

export default SearchBar;
