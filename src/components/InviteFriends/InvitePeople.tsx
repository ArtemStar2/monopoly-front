import React, { useState,useEffect } from 'react';
import { profileUsers } from '../../hooks/hooks';

const InvitePeople = () => {
  const userId = profileUsers((state) => state.profileReducer.id);
  const link = window.location.protocol + '://' + window.location.hostname + '/?userfriend='+ userId;
  console.log(link);
  return (
    <div className="invite-friends__board-invite-people">
      <div className="invite-friends__board-container">
        <h3>Send a URL to people you know. and they can become your friends</h3>
        <div className="invite-friends__board-invite-people-imgs d-f ai-c jc-c ">
          <div className="invite-friends__board-invite-people-img"></div>
          <div className="invite-friends__board-invite-people-img"></div>
          <div className="invite-friends__board-invite-people-img"></div>
        </div>
      </div>
      {link ?(
        <div className="invite-friends__board-invite-people-link" onClick={() => {
            navigator.clipboard.writeText(link);
            alert('Copy link');
          }}>
          <p>full link for invitatiomn</p>
        </div>
      ):(
        <></>
      )}

    </div>
  );
};

export default InvitePeople;
