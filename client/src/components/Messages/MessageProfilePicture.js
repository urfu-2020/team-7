import React from 'react';

function MessageProfilePicture(props) {
  const profilePath = `https://github.com/${props.username}.png`;
  const profileImgAlt = `${props.username} Profile Picture`
  return (
    <div className="picture-wrap message-group__picture-wrap">
      <img src={profilePath} alt={profileImgAlt} className="contact__picture" />
    </div>
  );
}

export default MessageProfilePicture;
