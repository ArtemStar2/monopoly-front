import React, { useState } from 'react';
import { useCookie } from '../../hooks/hooks';
import { Link } from 'react-router-dom';
const FriendSearch = (data: any) => {
    const [active, setActive] = useState(false);
    const ClickDelete = async () => {
        fetch('https://api.monopoly-dapp.com/friends/?id=' + data.props.id, { 
            method: "DELETE",
            headers: {
              'accept': 'application/json',
              'Authorization': data.token,
          },
        })
        .then(response => response.json())
        .then(json => {
            data.listFriends();
        });
      }
    const AddDeleteFriend = async () => {
        fetch('https://api.monopoly-dapp.com/friends/?id=' + data.props.id, { 
            method: active ? "DELETE" : "POST",
            headers: {
              'accept': 'application/json',
              'Authorization': data.token,
          },
        })
        .then(response => response.json())
        .then(json => {
            setActive(!active);
            fetch('https://api.monopoly-dapp.com/friends/', { 
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': data.token,
                },
            })
            .then(response => response.json())
            .then(json => {
            if(json.detail){
                console.log(json);
            }else{
                data.listFriends();
            }
            
            });
        });
    }
    return (
        <div className="invite-friends__board-add-friends-row d-g ai-c">
            <div className="invite-friends__board-add-friends-column">
                <img
                src={data.props.avatar ?? "https://beebom.com/wp-content/uploads/2022/02/Featured.jpg?w=750&quality=75"}
                alt="avatar"
                />
            </div>
            <Link to={data.props.id + "/"} className="invite-friends__board-add-friends-column invite-friends__board-add-friends-column-online">
                <span>{data.props.username}</span>
            </Link>
            <div className="invite-friends__board-add-friends-column">
                <span>{window.innerWidth > 700 ? 'Score: ' : ''}{data.props.score}</span>
            </div>
            {/* invite-friends__board-add-friends-column-add  */}
            {data?.props?.status == "pending" || "requested" == data?.props?.status ? (
                <div className='pending-friends box-button-diz' onClick={() => ClickDelete()}>PENDING</div>
            ) : (
                <>
                {data?.props?.status == "added" ? (
                    <div className='one-slovo'>Friends</div>
                ) : (
                    <div className={`invite-friends__board-add-friends-column ${active ? `invite-friends__board-add-friends-column-delete` : `invite-friends__board-add-friends-column-add`}`} onClick={AddDeleteFriend}></div>
                )}
                </>
               
            )}            
        </div>
  );
};

export default FriendSearch;
