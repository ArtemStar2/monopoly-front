import React, { FC } from 'react';
import logo from './../assets/images/logo.png';
import tg from './../assets/images/tg.png';
import inst from './../assets/images/inst.png';
import twitter from './../assets/images/twitter.png';
import tiktok from './../assets/images/tiktok.png';
import { Link, useMatch } from 'react-router-dom';

interface INavbar {
  refNavbar: any;
  isShowNavbar: any;
  toggleNavbar: (isCloseOrOpen: boolean) => void;
  CloseGame:any
}

const Navbar: FC<INavbar> = ({ refNavbar, isShowNavbar, toggleNavbar, CloseGame }) => {
  const match = useMatch("game");

  return (
    <div className={`navbar ta-c ${isShowNavbar && 'navbar--active'}`}>
      <div className="navbar__row" ref={refNavbar}>
        <div className="navbar__logo logo ">
          <a href="#">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <nav className="navbar__nav d-f fd-c jc-c ai-c">
          <ul>
            <li>
              <Link className="navbar__link " to="" onClick={() => {
                toggleNavbar(false);
                CloseGame();
              }}></Link>
            </li>
            <li>
              <Link className="navbar__link " style={{
                pointerEvents: match ? 'none' : 'auto',
              }} to="game" onClick={() => {
                toggleNavbar(false);
                CloseGame();
              }}></Link>
            </li>
            <li>
              <Link className="navbar__link " to="#" onClick={() => {
                toggleNavbar(false);
                CloseGame();
              }}></Link>
            </li>
            <li>
              <Link className="navbar__link " to="#" onClick={() => {
                toggleNavbar(false);
                CloseGame();
              }}></Link>
            </li>
            <li>
              <Link
                className="navbar__link "
                to="invite-friends"
                onClick={() => {
                  toggleNavbar(false);
                  CloseGame();
                }}></Link>
            </li>
          </ul>
        </nav>
        <ul className="soc">
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
      </div>
    </div>
  );
};

export default Navbar;
