import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useCookie } from '../hooks/hooks';
const LobbyItem = (data : any) => {
  const [openPrivateGamePopup,toggleAreYouReadyPopup] =
    useOutletContext<any>();
  return (
    <div className='lobby__board-row d-g'>
        <div className="lobby__board-column d-f ai-c">
        <img
            src={data.prors?.avatar ?? "https://beebom.com/wp-content/uploads/2022/02/Featured.jpg?w=750&quality=75"}
            // src="https://forkast.news/wp-content/uploads/2022/03/NFT-Avatar.png"
            alt="avatar"
        />
        <b>{data.prors?.username}</b>
        </div>
        <div className="lobby__board-column">
        <b>{data.prors?.score}</b>
        </div>
        <div className="lobby__board-column">
        <b>{data.prors?.bet} ETH</b>
        </div>
        <div className="lobby__board-column">
        {data.prors?.private ? (
          <button
            className="lobby__board-button lobby__board-button--private"
            onClick={() =>{
              data.data(data.prors);
              toggleAreYouReadyPopup(true);
            }}>
          </button>
        ) : (
          <button
            className="lobby__board-button lobby__board-button--play"
            onClick={()=> {
              data.data(data.prors);
              openPrivateGamePopup(true);
            }} ></button>
        )}
        </div>
    </div>
  );
};

export default LobbyItem;
