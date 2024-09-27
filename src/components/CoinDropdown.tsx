import React, { useState } from 'react';

interface CoinDropdownProps {
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
}

const CoinDropdown: React.FC<CoinDropdownProps> = ({ selectedCoin, setSelectedCoin }) => {
  const coins = [
    { name: 'USDT', icon: '../assets/usdt.png' },
    { name: 'BTC', icon: '../assets/btc.png' },
    { name: 'ETH', icon: '../assets/eth.png' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectCoin = (coin: string) => {
    setSelectedCoin(coin);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={coins.find((coin) => coin.name === selectedCoin)?.icon}
          alt={selectedCoin}
          className="w-6 h-6 mr-2"
        />
        <span className="font-bold text-lg">{selectedCoin}</span>
        <span className="ml-2 text-lg" style={{ color: '#5170fd' }}>
          &#x25BC;
        </span>
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg w-full">
          {coins.map((coin) => (
            <div
              key={coin.name}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCoin(coin.name)}
            >
              <img src={coin.icon} alt={coin.name} className="w-6 h-6 mr-2" />
              <span>{coin.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinDropdown;
