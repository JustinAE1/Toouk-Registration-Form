import React from "react";
import "../Styles/SuccessModal.css";

export default function WalletModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* Logo */}
        <div className="modal-header">
          <img
            src="https://i2.seadn.io/ronin/0x32950db2a7164ae833121501c797d79e7b79d74c/98bd5f56685b464c100145ad8d60d5/2398bd5f56685b464c100145ad8d60d5.png?w=350"
            alt="OpenSea"
            className="modal-logo"
          />
          <h2>User Added Successfully</h2>
        </div>

        {/* Wallet Options */}
        {/* <div className="wallet-list">
          <div className="wallet-item">
            <img src="https://i2.seadn.io/ronin/0x32950db2a7164ae833121501c797d79e7b79d74c/f86eae3b2c59314ac017e13cd5b7a8/0bf86eae3b2c59314ac017e13cd5b7a8.png?w=350" alt="MetaMask" />
            <span>MetaMask</span>
          </div>
          <div className="wallet-item">
            <img src="https://i2.seadn.io/ronin/0x32950db2a7164ae833121501c797d79e7b79d74c/98bd5f56685b464c100145ad8d60d5/2398bd5f56685b464c100145ad8d60d5.png?w=350" alt="Coinbase Wallet" />
            <span>Coinbase Wallet</span>
          </div>
          <div className="wallet-item">
            <img src="https://i2.seadn.io/ronin/0x32950db2a7164ae833121501c797d79e7b79d74c/5c95700f1b83a10f2cce614fd4af85/4c5c95700f1b83a10f2cce614fd4af85.png?w=350" alt="Abstract" />
            <span>Abstract</span>
          </div>
          <div className="wallet-item">
            <img src="https://i2.seadn.io/ronin/0x32950db2a7164ae833121501c797d79e7b79d74c/5c95700f1b83a10f2cce614fd4af85/4c5c95700f1b83a10f2cce614fd4af85.png?w=350" alt="WalletConnect" />
            <span>WalletConnect</span>
          </div>
        </div> */}

        {/* <div className="divider">
          <span>Any issues? connect us with email</span>
        </div> */}

        {/* <div className="email-box">
          <input type="email" placeholder="Continue with email" />
          <button className="email-btn">➜</button>
        </div> */}

      </div>
    </div>
  );
}
