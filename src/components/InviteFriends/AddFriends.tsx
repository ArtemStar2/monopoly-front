import React, { FC, useEffect, useRef, useState } from 'react';
import { profileUsers,useCookie } from '../../hooks/hooks';
import Friend from './Friend';
import SearchFriends from './components/searchUsers';
const AddFriends = () => {
  const [friends, setFriends] = useState(Array());
  const user = profileUsers((state) => state.profileReducer);
  const token: any = useCookie('refresh_token_cookie','')[0];
  const listFriends = async () => {
    fetch('https://api.monopoly-dapp.com/friends/', { 
      method: 'GET',
      headers: {
          'accept': 'application/json',
          'Authorization': token,
      },
    })
    .then(response => response.json())
    .then(json => {
      if(json.detail){
        console.log(json);
        setFriends([]);
      }else{
        setFriends(json);
      }
      
    });
  };
  useEffect(() => {
    fetch('https://api.monopoly-dapp.com/friends/', { 
      method: 'GET',
      headers: {
          'accept': 'application/json',
          'Authorization': token,
      },
    })
    .then(response => response.json())
    .then(json => {
      if(json.detail){
        console.log(json);
      }else{
        setFriends(json);
      }
      
    });
  }, []);
  // console.log(friends);
  return (
    <div className="invite-friends__board-add-friends">
      <div className="invite-friends__board-container">
        <SearchFriends user={user} listFriends={listFriends}/>
        <div className="invite-friends__board-add-friends-users">
        {friends?.map((data, index) =>{
            if(data.id != user.id){
              return (
                <Friend key={index} props={data} token={token} listFriends={listFriends}/>
              )
            }
          } 
        )}
        {friends.length == 0 ? (
          <div>no friends</div>
        ): (
          <></>
        )}
        </div>
      </div>
    </div>
  );
};

export default AddFriends;
