import React from 'react';

function Contact(props) {
  const profilePath = `https://github.com/${props.username}.png`;
  const profileImgAlt = `${props.username} Profile Picture`
  return (
    <li className="contacts__contact contact">
      <div className="contact__picture-wrap picture-wrap">
        <img src={profilePath} alt={profileImgAlt} className="contact__picture" />
      </div>
      <div className="contact__text-wrap">
        <span className="contact__name">{props.name || props.username}</span>
        <span className="contact__last-message">
          {/*<span className="contact__last-message_from">You:</span>*/}
          <span className="contact__last-message_content">@{props.username}</span>
        </span>
      </div>
    </li>
  );
}

export default Contact;
