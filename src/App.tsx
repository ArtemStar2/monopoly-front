import { useEffect,useState } from 'react';
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Layout2 from './components/Layout2';
import { useAppDispatch, useAppSelector,useCookie } from './hooks/hooks';
import Home from './pages/Home';
import InviteFriends from './pages/InviteFriends';
import Leaderboard from './pages/Leaderboard';
import Lobby from './pages/Lobby';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ProfileFriends from './pages/ProfileFriends';

import { fetchCurrencies } from './store/reducers/currencysReducer/ActionCreators';
import { profileSlice } from './store/reducers/profileReducer';
function App() {
  const dispatch = useAppDispatch();

  const [value,updateCookie,deleteCookie] = useCookie('refresh_token_cookie','');
  // const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const [buff, setBuff] = useState('');
  const { setUsersData } = profileSlice.actions;
  // console.log(isAuth);
  // get current price eth to usd
  console.log('asdasds');
  useEffect(() => {
    fetch('https://api.monopoly-dapp.com/users/', { 
      headers: {
          'accept': 'application/json',
          'Authorization': value,
      },
    })
    .then(response => response.json())
    .then(json => {
      dispatch(setUsersData(json));
    });
    dispatch(
      fetchCurrencies({
        from: 'ETH',
        to: 'USD',
      }),
    );
  }, []);
  
  return (
    <Routes>
    {value ? (
      <Route path="" element={<Layout />}>
        <Route path="" element={<Layout2 buff={buff} />}>
          <Route path="" element={<Lobby funbuff={setBuff} />} />
          <Route path="game" element={<Home />} />
          <Route path="invite-friends" element={<InviteFriends />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="profile" element={<Profile deleteCookie={deleteCookie}/>} />
          <Route path="invite-friends/:id" element={<ProfileFriends deleteCookie={deleteCookie}/>} />
        </Route>
      </Route>
    ) : (
      <> 
      <Route path="" element={<Register updateCookie={updateCookie} />} />     
      </>
    )}
    <Route path="auth" element={<Register updateCookie={updateCookie} />} />
    <Route path="*" element={<Navigate to={""} />} />
  </Routes>
  );
}

export default App;
