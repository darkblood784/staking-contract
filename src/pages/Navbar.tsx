import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../constants';
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import Web3 from 'web3';
import '../index.css';
import '../custom.css';

declare global {
  interface Window {
    ethereum?: any;
  }
}

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    label: t('English'),
    img: '/src/assets/language/en.svg',
  });

  const [account, setAccount] = useState('');
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('User rejected the connection', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const onChangeLang = (code: string, label: string, img: string) => {
    i18n.changeLanguage(code);
    setSelectedLanguage({ label, img });
    setIsOpen(false);
  };

  return (
    <div className="px-2 flex w-full items-center justify-between fixed z-40 top-0 left-0 h-28 md:pr-8 dark:bg-[rgba(255,255,255,0)] backdrop-blur-[30px] shadow-[0_3px_6px_3px_rgba(0,0,0,0.4)] transition-all duration-300 font-cubic">
      {/* Left side with Logo */}
      <div className="flex items-center">
        <a href="https://staking.whalestrategy.net/">
          <img src="/logo.png" className="w-16 h-16 sm:ml-10" alt="Logo" />
        </a>
      </div>

      {/* Right side with Connect Wallet and Language Selector */}
      <div className="flex items-center">
        {/* Wallet Dropdown */}
        <button
          onClick={() => setWalletOpen(!walletOpen)}
          className="w-28 md:w-32 flex justify-center bg-[#5170fd] text-white text-[16px] font-bold hover:scale-105 transition-transform duration-300"
        >
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Select Wallet'}
        </button>

        {walletOpen && (
          <div className="absolute ml-4 mt-2 w-36 bg-[#2c2d30] text-white shadow-lg">
            <div
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={connectMetaMask}
            >
              MetaMask
            </div>
            <WalletActionButton className="p-2 hover:bg-blue-100 cursor-pointer" />
          </div>
        )}

        {/* Language Selector */}
        <div className="relative ml-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-24 md:w-32 h-12 rounded-[4px] p-2 bg-[#5170fd] text-white text-[16px] font-bold hover:scale-105 transition-transform duration-300"
          >
            {selectedLanguage.img && (
              <img src={selectedLanguage.img} alt="" className="w-6 h-auto mr-2 mt-[4px]" />
            )}
            {t(selectedLanguage.label)}
          </button>
          {isOpen && (
            <div className="absolute top-full mt-1 w-24 md:w-32 bg-[#2c2d30] text-white shadow-lg">
              {LANGUAGES.map(({ code, label, lang }) => (
                <div
                  key={code}
                  className="flex items-center justify-center cursor-pointer p-2 hover:bg-blue-100"
                  onClick={() => onChangeLang(code, label, lang)}
                >
                  <img src={lang} alt="" className="w-6 h-auto mr-2 mt-[4px]" />
                  <span>{t(label)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
