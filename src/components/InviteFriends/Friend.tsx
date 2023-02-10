import React, { useState } from 'react';
import { useCookie } from '../../hooks/hooks';
import { Link } from 'react-router-dom';
import svgPlus from '../../assets/images/Approve-Hovered-01.svg'
const Friend = (data: any) => {
    const [active, setActive] = useState(data.props.isFriend);
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
            data.listFriends();
        });
    }
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
            console.log(json);
            data.listFriends();
        });
    }
    const ClickApprove = async (bool:any) => {
        const formData = new FormData();
        formData.append('isSpproved', bool);
        fetch('https://api.monopoly-dapp.com/friends/approve/?id=' + data.props.id, { 
            method: "POST",
            headers: {
              'accept': 'application/json',
              'Authorization': data.token,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            data.listFriends();
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
            {(() => {
                if (data.props.status == "requested") {
                    return (
                        <div className='plus-minus'>
                            <div className='plus-friends cont-button' onClick={() => ClickApprove(true)}></div>
                            <div className='minus-friends cont-button' onClick={() => ClickApprove(false)}></div>
                        </div>
                    )
                } else if (data.props.status == "added") {
                    return (
                        <div className='remove-friends box-button-diz' onClick={() => ClickDelete()}>REMOVE</div>
                    )
                } else {
                    return (
                        <div className='pending-friends box-button-diz' onClick={() => ClickDelete()}>PENDING</div>
                    )
                }
            })()}
            {/* <div className={`invite-friends__board-add-friends-column ${active ? `invite-friends__board-add-friends-column-delete` : `invite-friends__board-add-friends-column-add`}`} onClick={AddDeleteFriend}></div> */}
        </div>
  );
};

export default Friend;
