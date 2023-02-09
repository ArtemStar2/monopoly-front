import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import crownFirstPlace from './../assets/images/Crown_1st.png';
import baseCircle from './../assets/images/Base_circle.png';
import maskProfilePick from './../assets/images/Mask-ProfilePic.png';
import {profileUsers,useCookie } from '../hooks/hooks';
const Leaderboard = () => {
  const [usersTop, setUserTop] = useState(Array());
  const [users, setUser] = useState(Array());
  const token: any = useCookie('refresh_token_cookie','')[0];
  useEffect(() => {
    fetch('https://api.monopoly-dapp.com/leaderboard/top/', { 
      method: 'GET',
      headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    })
    .then(response => response.json())
    .then(json => {
      setUserTop(json);
    })
    fetch('https://api.monopoly-dapp.com/leaderboard/ranking/', { 
      method: 'GET',
      headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token,
      }
    })
    .then(response => response.json())
    .then(json => {
      setUser(json);
    })
  }, []);
    return (
      <section className="leaderboard section">
        <div className="leaderboard__container">
          <h2>Leaderboard</h2>
          <div className="leaderboard__board-wrapper">
            <div className="leaderboard__ranking d-f ai-c jc-sb">
              <div className="leaderboard__ranking-place leaderboard__ranking-second-place">
                <div className="leaderboard__ranking-img">
                  <img src={crownFirstPlace} alt="crown" />
                  <img src={maskProfilePick} alt="mask profile pick" />
                  <img src={baseCircle} alt="base circle" />
                </div>
                <p className="leaderboard__ranking-name">{usersTop[1]?.username}</p>
                <p className="leaderboard__ranking-score">{usersTop[1]?.highest_score}</p>
              </div>
              <div className="leaderboard__ranking-place leaderboard__ranking-first-place">
                <div className="leaderboard__ranking-img leaderboard__ranking-img-first-place">
                  <img src={crownFirstPlace} alt="crown" />
                  <img src={maskProfilePick} alt="mask profile pick" />
                  <img src={baseCircle} alt="base circle" />
                </div>
                <p className="leaderboard__ranking-name">{usersTop[0]?.username}</p>
                <p className="leaderboard__ranking-score">{usersTop[0]?.highest_score}</p>
              </div>
              <div className="leaderboard__ranking-place leaderboard__ranking-third-place">
                <div className="leaderboard__ranking-img">
                  <img src={crownFirstPlace} alt="crown" />
                  <img src={maskProfilePick} alt="mask profile pick" />
                  <img src={baseCircle} alt="base circle" />
                </div>
                <p className="leaderboard__ranking-name">{usersTop[2]?.username}</p>
                <p className="leaderboard__ranking-score">{usersTop[2]?.highest_score}</p>
              </div>  
              
            </div>
            <div className="leaderboard__board">
              <div className="leaderboard__board-container">
                <div className="leaderboard__board-row d-g ">
                  <div className="leaderboard__board-column">Rank</div>
                  <div className="leaderboard__board-column">Username</div>
                  <div className="leaderboard__board-column">Highest Score</div>
                </div>
                {users?.map((userItem, index) =>
                  <div key={index} className="leaderboard__board-row d-g ">
                    <div className="leaderboard__board-column">
                      <b>{userItem.rank}</b>
                    </div>
                    <div className="leaderboard__board-column d-f ai-c">
                      <img
                        src="https://forkast.news/wp-content/uploads/2022/03/NFT-Avatar.png"
                        alt="avatar"
                      />
                      <b>{userItem.username}</b>
                    </div>
                    <div className="leaderboard__board-column">
                      <b>{userItem.highest_score}</b>
                    </div>
                  </div>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  
};

export default Leaderboard;
