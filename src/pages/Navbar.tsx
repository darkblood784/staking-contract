import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui'; // Keep TronLink adapter
import Web3 from 'web3';

import '../index.css';
import '../custom.css';

function Navbar() {
  const { t, i18n } = useTranslation();

  const fontClass = i18n.language === 'en' ? 'font-cubic' : 'font-cubic';
  const [isOpen, setIsOpen] = useState(false);
  const [wallets, setWallets] = useState([]); // Wallet list state
  const [selectedWallet, setSelectedWallet] = useState('');
  const [account, setAccount] = useState('');
  const [isMetaMaskConnected, setMetaMaskConnected] = useState(false);

  useEffect(() => {
    detectWallets();
  }, []);

  // Detect available wallets including MetaMask and TronLink
  const detectWallets = async () => {
    const detectedWallets = [];

    // Detect MetaMask
    if (window.ethereum) {
      detectedWallets.push('MetaMask');
    }

    // Detect TronLink (using TronLink Adapter)
    detectedWallets.push('TronLink'); 

    // Add other wallets (e.g., WalletConnect, OKX, etc.) manually if needed
    detectedWallets.push('WalletConnect', 'Ledger', 'TokenPocket', 'Bitget Wallet', 'OKX Wallet');

    setWallets(detectedWallets);
  };

  // MetaMask connection function
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setMetaMaskConnected(true);
      } catch (error) {
        console.error('User rejected the connection');
      }
    } else {
      alert('MetaMask is not available. Please install it.');
    }
  };

  // Function to handle wallet selection from the dropdown
  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);

    // Add logic to connect to the respective wallet
    if (wallet === 'MetaMask') {
      connectMetaMask();
    }

    // Handle TronLink and other wallets similarly
  };

  return (
    <div className={`px-2 flex w-full items-center justify-between fixed z-40 top-0 left-0 h-28 md:pr-8 dark:bg-[rgba(255,255,255,0)] backdrop-blur-[30px] shadow-[0_3px_6px_3px_rgba(0,0,0,0.4)] transition-all duration-300 ${fontClass}`}>
      {/* Left side with Logo */}
      <div className="flex items-center">
        <a href="https://staking.whalestrategy.net/">
          <img src="/logo.png" className="w-16 h-16 sm:ml-10" alt="Logo" />
        </a>
      </div>

      {/* Right side with Wallet Connect buttons and Language Selector */}
      <div className="flex items-center">
        {/* Wallet Dropdown */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-24 md:w-32 h-12 rounded-[4px] p-2 bg-[#5170fd] text-white text-[16px] font-bold ml-4 hover:scale-105 transition-transform duration-300">
            {selectedWallet ? selectedWallet : 'Select Wallet'}
          </button>
          {isOpen && (
            <div className="absolute ml-4 top-full mt-1 w-48 bg-[#2c2d30] text-white shadow-lg">
              {wallets.map((wallet, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center cursor-pointer p-2 hover:bg-blue-100"
                  onClick={() => handleWalletSelect(wallet)}
                >
                  <span>{wallet}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tron Wallet Action Button (Keep if you want Tron wallet separately) */}
        <WalletActionButton className={`w-28 md:w-32 flex justify-center bg-[#5170fd] text-white text-[16px] font-bold hover:scale-105 transition-transform duration-300 ${fontClass}`} />

        {/* Language Selector */}
        <div className="relative">
          {/* Language Button Logic (already implemented) */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
