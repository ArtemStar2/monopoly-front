import React, { ChangeEvent, useState } from 'react';
import { Outlet, useOutletContext,useNavigate } from 'react-router-dom';
import { useAppSelector, useOutside, useWeb3Helper } from '../hooks/hooks';
import Header from './Header';
import Navbar from './Navbar';
import transactionSuccessful from './../assets/images/transaction-successful.png';
import arrowLeft from './../assets/images/Arrow-.png';
import { ethers } from 'ethers';
import { profileUsers,useCookie } from '../hooks/hooks';

const Layout2 = (buff:any) => {
  const [
    refDepositFunds,
    isShowDepositFunds,
    setIsShowDepositFunds,
    toggleDepositFundsPopup,
    refApproveDeposit,
    isShowApproveDeposit,
    setIsShowApproveDeposit,
    toggleApproveDepositPopup,
    refTransactionSuccess,
    isShowTransactionSuccess,
    setIsShowTransactionSuccess,
    toggleTransactionSuccessPopup,
    refAddFunds,
    isShowAddFunds,
    setIsShowAddFunds,
    toggleAddFundsPopup,
    refTotalBalance,
    isShowTotalBalance,
    setIsShowTotalBalance,
    toggleTotalBalancePopup,
  ] = useOutletContext<any>();

  // are you ready popup
  const {
    ref: refAreYouReady,
    isShow: isShowAreYouReady,
    setIsShow: setIsShowAreYouReady,
  } = useOutside(false);
  // private game popup
  const {
    ref: refPrivateGamePopup,
    isShow: isShowPrivateGamePopup,
    setIsShow: setIsShowPrivateGamePopup,
  } = useOutside(false);

  // create room popup
  const {
    ref: refCreateYourRoom,
    isShow: isShowCreateYourRoom,
    setIsShow: setIsShowCreateYourRoom,
  } = useOutside(false);

  const toggleAreYouReadyPopup = (isCloseOrOpen: boolean) => {
    setIsShowAreYouReady(isCloseOrOpen);
  };

  const openPrivateGamePopup = (isCloseOrOpen: boolean) => {
    // console.log(test);
    setIsShowPrivateGamePopup(isCloseOrOpen);
  };

  const openCreateGamePopup = () => {
    setIsShowCreateYourRoom(true);
  };

  // delete all
  const delete1 = () => {
    toggleDepositFundsPopup(false);
    toggleAddFundsPopup(true);
  };

  const delete2 = () => {
    toggleAddFundsPopup(false);
    toggleTransactionSuccessPopup(true);
  };

  const delete3 = () => {
    toggleTransactionSuccessPopup(false);
    toggleApproveDepositPopup(true);
  };
  const [walletAddress,,] = useCookie('wallet_cookie','');
  // const walletAddress = useAppSelector((state) => state.profileReducer.walletAddress);
  const balanceETH = useAppSelector((state) => state.profileReducer.balanceETH);
  const balanceUSD = useAppSelector((state) => state.profileReducer.balanceUSD);
  const ethToUsd = useAppSelector((state) => state.currencysReducer.ethToUsd);

  const [depositAmountInputValue, setDepositAmountInputValue] = useState<string>('');
  const [withdrawAmountInputValue, setWithdrawAmountInputValue] = useState<string>('');
  const [withdrawToAnotherAccountInputValue, setWithdrawToAnotherAccountInputValue] =
    useState<string>('');

  const { httpProvider, wallet, sender } = useWeb3Helper();

  const successDeposited = () => {};

  const withdraw = async () => {
    try {
      const senderBalanceBefore = await httpProvider.getBalance(sender);
      const recieverBalanceBefore = await httpProvider.getBalance(walletAddress as string);

      console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`);
      console.log(
        `reciever balance before: ${ethers.utils.formatEther(
          '0x3d443781376eecbdb7e13b8d11998358a2c5d1a0',
        )}\n`,
      );
      const gasPrice = await httpProvider.getGasPrice();

      const tx = await wallet.sendTransaction({
        to: '0x3d443781376eecbdb7e13b8d11998358a2c5d1a0',
        value: ethers.utils.parseEther(withdrawAmountInputValue),
        gasPrice: gasPrice._hex,
      });

      await tx.wait();
      console.log(tx);

      const senderBalanceAfter = await httpProvider.getBalance(sender);
      const recieverBalanceAfter = await httpProvider.getBalance(
        '0x3d443781376eecbdb7e13b8d11998358a2c5d1a0',
      );

      console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`);
      console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`);
      toggleTotalBalancePopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deposit = async () => {
    const gasPrice = await httpProvider.getGasPrice(); // 0.00000001 eth

    // const transactionParameters = {
    //   gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
    //   to: '0x8243E8a9293C266A248e684031480fDaC84e4e12', // Required except during contract publications. (my)
    //   from: '0x8243E8a9293C266A248e684031480fDaC84e4e12', // must match user's active address. (user)
    //   value: '0x' + (1000000000000000000 * Number(depositAmountInputValue)).toString(16), // Only required to send ether to the recipient from the initiating external account.
    // };

    const transactionParameters = {
      gasPrice: gasPrice._hex, // customizable by user during MetaMask confirmation.
      to: sender, // Required except during contract publications. (my)
      from: walletAddress, // must match user's active address. (user)
      value: '0x' + (1000000000000000000 * Number(depositAmountInputValue)).toString(16), // Only required to send ether to the recipient from the initiating external account.
    };

    // txHash is a hex string
    // As with any RPC call, it may throw an error
    try {
      const txHash = window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        })
        .then(() => {
          toggleApproveDepositPopup(false);
          toggleTransactionSuccessPopup(true);
        });
      toggleDepositFundsPopup(false);
      toggleApproveDepositPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  const changeDepositAmountInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!isNaN(Number(value)) && value[value.length - 1] !== ' ') {
      setDepositAmountInputValue(value);
    }
  };

  const changeWithdrawAmountInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!isNaN(Number(value)) && value[value.length - 1] !== ' ') {
      setWithdrawAmountInputValue(value);
    }
  };
  const token: any = useCookie('refresh_token_cookie','')[0];
  const user = profileUsers((state) => state.profileReducer);
  function str_rand() {
    var result       = '';
    var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    var max_position = words.length - 1;
        for(var i = 0; i < 10; ++i ) {
            var position = Math.floor ( Math.random() * max_position );
            result = result + words.substring(position, position + 1);
        }
    return result;
  }
  function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  const [lobbyCode, setLobbyCode] = useState('');
  const [linkCode, setLinkCode] = useState(generateUUID());
  const [lobbyPrice, setLobbyPrice] = useState('');
  
  const [activePrivate, setActivePrivate] = useState(false);
  const createLobby = async () => {
    let userBet = lobbyPrice;
    if(userBet){
      try {
        fetch('https://api.monopoly-dapp.com/lobby/?link=' + linkCode, { 
          method: 'POST',
          headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token,
          },
          body: JSON.stringify({
            'bet': lobbyPrice,
            'password': lobbyCode,
          })
        })
        .then(response => response.json())
        .then(json => {
          if(!json.detail){
            setLobbyCode('');
            setLinkCode(generateUUID());
            setLobbyPrice('');
            setActivePrivate(false);
            setIsShowCreateYourRoom(false);
            console.log(json);
            startGame(json.id, 'owner');
          }else{
            console.log(json.detail);
          }  
        });
      } catch (error) {
        console.log(error);
      }
    }else{
      console.log('error');
    }
  }
  const Private = () => {
    if(activePrivate){
      setLobbyCode('');
    }else{
      setLobbyCode(str_rand());
    }
    setActivePrivate(!activePrivate);
  }
  
  const [connectLobbyCode, setConnectLobbyCode] = useState('');
  
  const connectLobby = async () => {    
    try {
      fetch('https://api.monopoly-dapp.com/lobby/play/?link='+ buff.buff.lobbyId, { 
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
          'bet': buff.buff.bet,
          'password': connectLobbyCode,
        })
      })
      .then(response => response.json())
      .then(json => {
        if(json.detail){
          console.error('error: ' + json.detail);
        }else{
          if(isShowAreYouReady){
            console.log(json);
            startGame(buff.buff.lobbyId, 'opponent');
            setConnectLobbyCode('');
          }else{
            openPrivateGamePopup(false);
            toggleAreYouReadyPopup(true);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();
  const startGame = async (id:any,roll:string) => {
    navigate("/game/?lobby=" + id + "&status=" + roll);
  }
  return (
    <>
      <div
        className={`deposit-funds-popup popup d-f ai-c jc-c ${
          isShowDepositFunds && 'popup--active'
        }`}>
        <div className="deposit-funds-popup__container" ref={refDepositFunds}>
          <div
            className="close-popup"
            onClick={() => {
              toggleDepositFundsPopup(false);
            }}></div>
          <h3>Deposit funds</h3>
          <p className="deposit-funds-popup__amount">Amount in ETH</p>
          <input
            type="text"
            placeholder="Enter Amount in ETH"
            value={depositAmountInputValue}
            onChange={changeDepositAmountInput}
          />
          <p className="deposit-funds-popup__total-price d-f jc-sb ai-c">
            <span>Total price</span>
            <span>{Number(depositAmountInputValue).toFixed(2)} ETH</span>
          </p>
          <p className="deposit-funds-popup__price-usd">
            ${ethToUsd ? (ethToUsd * Number(depositAmountInputValue)).toFixed(3) : 0}
          </p>
          <button onClick={deposit}></button>
        </div>
      </div>

      <div
        className={`approve-deposit-popup popup d-f ai-c jc-c ${
          isShowApproveDeposit && 'popup--active'
        }`}>
        <div className="approve-deposit-popup__container" ref={refApproveDeposit}>
          <div className="close-popup" onClick={() => toggleApproveDepositPopup(false)}></div>
          <h3>Approve deposit</h3>
          <p className="approve-deposit-popup__amount">Amount deposited</p>
          <input type="text" value={`${Number(depositAmountInputValue).toFixed(1)} ETH`} />
          <p className="approve-deposit-popup__total-price d-f jc-sb ai-c">
            <span>Total price</span>
            <span>{Number(depositAmountInputValue).toFixed(2)} ETH</span>
          </p>
          <p className="approve-deposit-popup__price-usd">
            {' '}
            ${ethToUsd ? (ethToUsd * Number(depositAmountInputValue)).toFixed(3) : 0}
          </p>
          <div className="approve-deposit-popup__bottom">
            <h4>Go to your wallet</h4>
            <p>Approved this purchase from your wallet</p>
          </div>
        </div>
      </div>

      <div
        className={`transaction-success-popup popup d-f ai-c jc-c ${
          isShowTransactionSuccess && 'popup--active'
        }`}>
        <div className="transaction-success-popup__container" ref={refTransactionSuccess}>
          <div className="close-popup" onClick={() => toggleTransactionSuccessPopup(false)}></div>
          <h3>Transaction Successful</h3>
          <p>You deposited {Number(depositAmountInputValue).toFixed(1)} eth</p>
          <div className="transaction-success-popup__img">
            <img src={transactionSuccessful} alt="transaction success" />
          </div>
          <a href="#">View on Etherscan</a>
          <button onClick={delete3}></button>
        </div>
      </div>

      <div className={`add-funds-popup popup d-f ai-c jc-c ${isShowAddFunds && 'popup--active'}`}>
        <div className="add-funds-popup__container" ref={refAddFunds}>
          <div className="close-popup" onClick={() => toggleAddFundsPopup(false)}></div>
          <h3>Add funds</h3>
          <div className="add-funds-popup__need">
            You need 0.8 eth <span>+ gas fees</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sint quibusdam autem.
            Fugit natus, quod enim iusto earum
          </p>
          <div className="add-funds-popup__wallet-balance d-f jc-sb ai-c">
            <span>Your ETH wallet:</span>
            <span>Balance: 0.0176 eth</span>
          </div>
          <div className="add-funds-popup__link">
            <div className="add-funds-popup__link-container">full link for invitation</div>
          </div>
          <button onClick={delete2}></button>
        </div>
      </div>

      <div
        className={`total-balance-popup popup d-f ai-c jc-c ${
          isShowTotalBalance && 'popup--active'
        }`}>
        <div className="total-balance-popup__container" ref={refTotalBalance}>
          <div className="close-popup" onClick={() => toggleTotalBalancePopup(false)}></div>
          <h3>Total Balance</h3>
          <div className="total-balance-popup__need">{balanceETH.toFixed(1)} ETH</div>
          <p className="total-balance-popup__enter-amount">Enter the amount you want to withdraw</p>
          <input
            className="total-balance-popup__enter-amount-input"
            type="text"
            placeholder="Enter Amount in ETH"
            value={withdrawAmountInputValue}
            onChange={changeWithdrawAmountInput}
          />
          <p className="total-balance-popup__total-price d-f jc-sb ai-c">
            <span>Total price</span>
            <span>{Number(withdrawAmountInputValue).toFixed(2)} ETH</span>
          </p>
          <p className="total-balance-popup__price-usd">
            ${ethToUsd ? (ethToUsd * Number(withdrawAmountInputValue)).toFixed(3) : 0}
          </p>
          <div className="total-balance-popup__bottom">
            <p>The amount will be withdraw to your account of MetaMask connected</p>
            <p>
              <b>Send to a different wallet</b>
            </p>
          </div>
          <input className="total-balance-popup__different-wallet" placeholder="full link wallet" />
          <button onClick={withdraw}></button>
        </div>
      </div>

      <div
        className={`are-you-ready-popup popup d-f ai-c jc-c ${
          isShowAreYouReady && 'popup--active'
        }`}>
        <div className="are-you-ready-popup__container" ref={refAreYouReady}>
          <h2>
            <span>Are</span>
            <span>You</span>
            <span>Ready?</span>
          </h2>
          <button onClick={connectLobby}>Play Now {buff.buff.bet} ETH</button>
        </div>
      </div>

      <div
        className={`lobby__private-game-popup popup d-f ai-c jc-c ${
          isShowPrivateGamePopup && 'popup--active'
        }`}>
        <div className="lobby__private-game-popup-container" ref={refPrivateGamePopup}>
          <h2>Private Game</h2>
          <input type="text" placeholder="Enter Code" maxLength={10} value={connectLobbyCode} onChange={(e) => setConnectLobbyCode(e.target.value)} />
          <button onClick={connectLobby}></button>
        </div>
      </div>

      <div
        className={`lobby__private-room-popup popup d-f ai-c jc-c ${
          isShowCreateYourRoom && 'popup--active'
        }`}>
        <img className="lobby__private-room-popup-arrow-left" src={arrowLeft} alt="arrow to left" />
        <div className="lobby__private-room-popup-container " ref={refCreateYourRoom}>
          <h2>Create Your Room</h2>
          <div className="lobby__private-room-popup-content">
            <input className="lobby__private-room-popup-price inputHTWO" type="number" min="0.008" max="999999" placeholder='0.0' value={lobbyPrice} onChange={(e) => setLobbyPrice(e.target.value)} />
            <p className="lobby__private-room-popup-min-price">minimum 0.008 eth</p>
            <div className="lobby__private-room-popup-make-private">
              <div className={activePrivate ? "lobby__private-room-popup-checkbox active" : "lobby__private-room-popup-checkbox"} onClick={() => Private()}></div>
              <label htmlFor="lobby__private-room-popup-make-private">Make it private</label>
            </div>
            <input className="lobby__private-room-popup-make-private-code inputP" type="text" value={lobbyCode} maxLength={10} placeholder='0000000000' />
            <p className="lobby__private-room-popup-make-private-link" onClick={() => {
              navigator.clipboard.writeText( window.location.protocol + '://' + window.location.hostname + '/?lobby='+ linkCode);
              alert('Copy address');
            }}>
              <span>full link of game for play</span>
            </p>
            <div className="lobby__private-room-popup-make-private-button" onClick={createLobby}></div>
          </div>
        </div>
      </div>

      <Outlet
        context={[
          toggleAreYouReadyPopup,
          openPrivateGamePopup,
          openCreateGamePopup,
          toggleDepositFundsPopup,
          toggleTransactionSuccessPopup,
          toggleApproveDepositPopup,
          toggleAddFundsPopup,
          toggleTotalBalancePopup,
        ]}
      />
    </>
  );
};

export default Layout2;
