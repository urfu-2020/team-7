import React from 'react';
import Contact from "./Contact";

function ContactList(props) {
  return (
    <section className="main-window__contacts-container">
      <ul className="main-window__contacts contacts">
        <Contact username='SavelevMatthew' name='Aboba' />
        <Contact username='SavelevMatthew' name='' />
        <Contact username='SavelevMatthew' name='' />
        <Contact username='SavelevMatthew' name='' />
        <Contact username='SavelevMatthew' name='' />
        <Contact username='SavelevMatthew' name='' />
      </ul>
    </section>
  );
}

export default ContactList;
