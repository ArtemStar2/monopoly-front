import { ethers } from 'ethers';
import React, { FC, useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAppSelector, useWeb3Helper } from '../hooks/hooks';
import logo from './../assets/images/logo.png';

interface IHeader {
  headerRef?: any;
  toggleDepositFundsPopup: (isCloseOrOpen: boolean) => void;
  toggleTotalBalancePopup: (isCloseOrOpen: boolean) => void;
  toggleNavbar: (isCloseOrOpen: boolean) => void;
  CloseGame: () => void;
}

const Header: FC<IHeader> = ({
  headerRef,
  toggleDepositFundsPopup,
  toggleTotalBalancePopup,
  toggleNavbar,
  CloseGame,
}) => {
  const balanceETH = useAppSelector((state) => state.profileReducer.balanceETH);
  const balanceUSD = useAppSelector((state) => state.profileReducer.balanceUSD);
  const username = useAppSelector((state) => state.profileReducer.username);
  return (
    <header className="header" ref={headerRef}>
      <div className="header__row d-f ai-c jc-sb">
        <div className="header__left d-f ai-c">
          <p>
            <a className="link" href="#" onClick={CloseGame}>
              Play-to-earn
            </a>
          </p>
          <p>
            <Link className="d-f ai-c" to="leaderboard" onClick={CloseGame}>
              Leaderboard
            </Link>
          </p>
          <p className="logo">
            <a href="#" onClick={CloseGame}>
              <img src={logo} alt="logo" />
            </a>
          </p>
        </div>
        <div className="header__right d-f ai-c">
          <p>
            <button
              className="d-f"
              onClick={() => {
                toggleDepositFundsPopup(true);
              }}>
              {balanceETH} eth[${balanceUSD}]
            </button>
          </p>
          <p>
            <a
              className="d-f ai-c"
              href="#"
              onClick={() => {
                toggleDepositFundsPopup(true);
              }}>
              Deposit
            </a>
          </p>
          <p>
            <a
              className="d-f ai-c"
              href="#"
              onClick={() => {
                toggleTotalBalancePopup(true);
              }}>
              Withdraw
            </a>
          </p>
          <p className='header_user'>
            <Link className="d-f ai-c" to="profile" onClick={CloseGame}>
              <span>{username}</span>
              <span></span>
            </Link>
          </p>
          <p>
            <div className="burger" onClick={() => toggleNavbar(true)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
