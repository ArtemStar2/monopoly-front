import React from 'react';
import { useState, ChangeEvent, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { authSlice } from '../store/reducers/authReducer';
import { profileSlice } from '../store/reducers/profileReducer';
import { Link  } from "react-router-dom";
import { useAppDispatch, profileUsers, useCookie } from '../hooks/hooks';

const Profile = (state:any) => {
  const person = profileUsers((state) => state.profileReducer.id);
  const [users, setUsers] = useState<any>([]);
  const [active, setActive] = useState(false);
  const token: any = useCookie('refresh_token_cookie','')[0];
  const params = useParams();
  console.log(users);
  var buff = [];
  if(users?.friends?.length > 0){
    const test = Object.keys(users?.friends).find(key => users?.friends[key].id === person) ?? '-1';
    buff = users?.friends[test];
    console.log(buff);
  }
  const Refresh = async () => {
    fetch('https://api.monopoly-dapp.com/users/?id=' + params.id, { 
      headers: {
          'accept': 'application/json',
          'Authorization': token,
      },
    })
    .then(response => response.json())
    .then(json => {
      setUsers(json);
    });
  }
  const AddDeleteFriend = async () => {
    fetch('https://api.monopoly-dapp.com/friends/?id=' + users.id, { 
        method: active ? "DELETE" : "POST",
        headers: {
          'accept': 'application/json',
          'Authorization': token,
      },
    })
    .then(response => response.json())
    .then(json => {
        setActive(!active);
        Refresh();
    });
  }
  const ClickDelete = async () => {
    fetch('https://api.monopoly-dapp.com/friends/?id=' + users.id, { 
        method: "DELETE",
        headers: {
          'accept': 'application/json',
          'Authorization': token,
      },
    })
    .then(response => response.json())
    .then(json => {
      Refresh();
    });
  }
  // Изменение имени
  useEffect(() => {
    Refresh()
  }, []);
  // console.log(users);


  return (
    <section className="profile section soloFriends">
      <div className="profile__container">
        <div className="profile__row ">
          <div className="profile__column myPhoto">
          <img src={users?.avatar ?? "https://beebom.com/wp-content/uploads/2022/02/Featured.jpg?w=750&quality=75"} alt="avatar" />
          {buff?.status == "pending" || "requested" == buff?.status ? (
                <div className='pending-friends box-button-diz' onClick={() => ClickDelete()}>PENDING</div>
            ) : (
                <>
                {buff?.status == "added" ? (
                    <div className='remove-friends box-button-diz' onClick={() => ClickDelete()}>REMOVE</div>
                ) : (
                    <div className={`invite-friends__board-add-friends-column invite-friends__board-add-friends-column-add`} onClick={AddDeleteFriend}></div>
                )}
                </>
            )}   
          </div>
          <div className="profile__column">
            <p className='profile__name'>{users?.username}</p>
            <p className="profile__score">Score {users?.score}</p>
          </div>
          <div className="profile__social-rows">
            <div className="profile__social-row    d-f ai-c">
              <div className="profile__social-row-right profile__social-row-right--connect"></div>
            </div>
            <div className="profile__social-row d-f ai-c">
              <div className="profile__social-row-right profile__social-row-right--connected ">
                {/* <span>Sample_Unlink</span> */}
              </div>
            </div>
            <div className="profile__social-row   d-f ai-c">
              <div className="profile__social-row-right profile__social-row-right--connect"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
