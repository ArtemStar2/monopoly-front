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
import { useUnityContext  } from 'react-unity-webgl';

var CloseGame:any;

function App() {
  const dispatch = useAppDispatch();

  const [value,updateCookie,deleteCookie] = useCookie('refresh_token_cookie','');
  // const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const [buff, setBuff] = useState('');
  const { setUsersData } = profileSlice.actions;
  useEffect(() => {
    if(value){
      try {
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
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(
      fetchCurrencies({
        from: 'ETH',
        to: 'USD',
      }),
    );
  }, []);
  // ------------
  function getGet(name:any){
    var s = window.location.search.match(new RegExp(name + '=([^&=]+)'));
    return s ? s[1] : '';
  }
  
  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: getGet("lobby") ? '/Build/MonopolyBuild.loader.js' : '/MonopolyBuildSolo/Build/MonopolyBuild.loader.js',
    dataUrl: getGet("lobby") ? '/Build/MonopolyBuild.data' : '/MonopolyBuildSolo/Build/MonopolyBuild.data',
    frameworkUrl: getGet("lobby") ? '/Build/MonopolyBuild.framework.js' : '/MonopolyBuildSolo/Build/MonopolyBuild.framework.js',
    codeUrl: getGet("lobby") ? '/Build/MonopolyBuild.wasm' : '/MonopolyBuildSolo/Build/MonopolyBuild.wasm',
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'DefaultCompany',
    productName: 'Metamonopoly',
    productVersion: '1.0',
  });
  function CloseGame(){
    sendMessage("ApiClient", "CloseGame", );
  }
  // window.location.href = '/game/';
  // ------------
  return (
    <Routes>
    {value ? (
      <Route path="" element={<Layout CloseGame={CloseGame} />}>
        <Route path="" element={<Layout2 buff={buff} />}>
          <Route path="" element={<Lobby funbuff={setBuff} />} />
          <Route path="game" element={<Home unityProvider={unityProvider} isLoaded={isLoaded} loadingProgression={loadingProgression} sendMessage={sendMessage}/>} />
          <Route path="invite-friends" element={<InviteFriends />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="leaderboard/:id" element={<ProfileFriends deleteCookie={deleteCookie}/>} />
          <Route path="profile" element={<Profile deleteCookie={deleteCookie}/>} />
          <Route path="invite-friends/:id" element={<ProfileFriends deleteCookie={deleteCookie}/>} />
        </Route>
      </Route>
    ) : (
      <Route path="" element={<Register updateCookie={updateCookie} />} />   
    )}
    <Route path="auth" element={<Register updateCookie={updateCookie} />} />
    <Route path="*" element={<Navigate to={""} />} />
  </Routes>
  );
}

export default App;
