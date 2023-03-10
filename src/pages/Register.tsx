import React, {useMemo} from 'react';
import logo from './../assets/images/logo.png';
import twitter from './../assets/images/twitter.png';
import inst from './../assets/images/inst.png';
import tiktok from './../assets/images/tiktok.png';
import tg from './../assets/images/tg.png';
import ConnectWalletNORMAL from './../assets/images/ConnectWallet_NORMAL.png';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { profileSlice } from '../store/reducers/profileReducer';
import { authSlice } from '../store/reducers/authReducer';
import {  useWeb3Helper,useAppDispatch } from '../hooks/hooks';

declare global {
  interface Window {
    ethereum?: any;
  }
}
const Register = (state: any) => {
  const { connectWalletProvider } = useWeb3Helper();
  const params = new URLSearchParams(window.location.search).get('userfriend');
  const { setUsersData } = profileSlice.actions;
  const dispatch = useAppDispatch();
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const account = await connectWalletProvider.send('eth_requestAccounts', [{}]);
        fetch('https://api.monopoly-dapp.com/auth/' + (params ? '?inviter='+params : ''), { 
          method: 'POST',
          headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'walletAddress': account[0],
          })
        })
        .then(response => response.json())
        .then(json => {
          if(json.token && json.type){
            state.updateCookie(json.type + ' ' + json.token); 
            fetch('https://api.monopoly-dapp.com/users/', { 
              headers: {
                  'accept': 'application/json',
                  'Authorization': json.type + ' ' + json.token,
              },
            })
            .then(response => response.json())
            .then(json => {
              console.log(json);
              dispatch(setUsersData(json));
            });
          }else{
            console.log('error: ' + json.detail);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('did not detected');
    }
  };
  return (
    <>
      <section className="registration">
        <div className="registration__row">
          <div className="registration__content d-f fd-c ai-c jc-c">
            <div className="registration__contentImg">
              <img src={logo} alt="logo" />
            </div>
            <button className="button" onClick={connectWallet} />
            <p className="d-f ai-c online">
              Users Online:<b>X,XXX</b>
            </p>
          </div>
          <div className="registration__bottom d-f ai-c jc-sb">
            <p>
              Need help?{' '}
              <a className="link" href="#">
                Ask in Telegram
              </a>{' '}
            </p>
            <p>metamonopoly.org 2022</p>
            <p>
              <ul className="soc d-f ai-c">
                <li>
                  <a href="https://twitter.com/MetaMonopoly"></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/meta.monopoly/"></a>
                </li>
                <li>
                  <a href="https://t.me/metamonopolyofficial"></a>
                </li>
                <li>
                  <a href="#"></a>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
