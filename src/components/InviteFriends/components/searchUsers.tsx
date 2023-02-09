import { useState,useEffect } from 'react';
import { useCookie } from '../../../hooks/hooks';
import FriendSearch from '../FriendSearch';

const SearchFriends = (props:any) => {
    const [search, setSeacrch] = useState('');
    const token: any = useCookie('refresh_token_cookie','')[0];
    const [users, setUsers] = useState([]);
    const [active, setActive] = useState(false);
    const [timer, setTimer] = useState<any>(null);

    function changeDelay(change:any) {
        if (timer) {
        clearTimeout(timer);
        setTimer(null);
        }
        setTimer(
        setTimeout(() => {
            if(change.length > 0){
                try {
                    console.log(change);
                    fetch('https://api.monopoly-dapp.com/friends/search/?username=' + change, { 
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'Authorization': token,
                        },
                    })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        setUsers(json);
                    });
                } catch (error) {
                console.log(error);
                }
            }else{
                setActive(false)
                setUsers([]);
            }
            
        }, 500)
        );
        setActive(true);
        setSeacrch(change);
    }

    // alert(users);
    return (
        <div className={`friends-box ${active ? 'active' : ''}`}>
            <input
            className="invite-friends__board-add-friends-search"
            type="text"
            placeholder="Seacrh by username or code"
            value={search}
            onChange={(e) => changeDelay(e.target.value)}
            onClick={() => setActive(!active)}
            />
            <div className='friends-list' id='friend_list' onBlur={() => setActive(false)}>
                {users?.length > 0 ? (
                    <>
                        {users?.map((data:any, index:any) =>{
                            if(data.id != props.user.id){
                                return (
                                    <FriendSearch key={index} props={data} token={token} listFriends={props.listFriends} id={props.user.id}/>
                                )
                            }
                        } 
                        )}
                    </>
                ) : (
                    <div className='error'>No user found with this username</div>
                )}
            </div>
        </div>
    )
};

export default SearchFriends;