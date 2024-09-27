import React, { useState } from 'react';
import usdtIcon from '../assets/usdt.png';
import btcIcon from '../assets/btc.png';
import ethIcon from '../assets/eth.png';

type Coin = 'ETH' | 'USDT' | 'BTC';

interface CoinDropdownProps {
    selectedCoin: Coin;
    setSelectedCoin: (coin: Coin) => void;
}

const CoinDropdown: React.FC<CoinDropdownProps> = ({ selectedCoin, setSelectedCoin }) => {
    const [isOpen, setIsOpen] = useState(false);

    const coins = [
        { name: 'USDT', icon: usdtIcon },
        { name: 'BTC', icon: btcIcon },
        { name: 'ETH', icon: ethIcon },
    ];

    const handleCoinSelect = (coin: Coin) => {
        setSelectedCoin(coin);
        setIsOpen(false); // Close the dropdown after selection
    };

    return (
        <div className="relative inline-block text-left">
            {/* Trigger to open/close the dropdown */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center font-cubic text-[1.2vw] bg-transparent border-none outline-none hover:text-[#5170fd] transition-colors duration-200" // Hover effect on the dropdown button
            >
                <img
                    src={coins.find(coin => coin.name === selectedCoin)?.icon}
                    alt={selectedCoin}
                    className="w-4 h-4 mr-2"
                />
                {selectedCoin}
                <span className="ml-2" style={{ color: '#5170fd', fontSize: '1.2vw' }}>
                    &#x25BC;
                </span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-black text-white rounded shadow-lg z-10">
                    {coins.map((coin) => (
                        <div
                            key={coin.name}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 text-[1vw] transition-colors duration-200" // Adjust the font size here
                            onClick={() => handleCoinSelect(coin.name as Coin)}
                        >
                            <img src={coin.icon} alt={coin.name} className="w-4 h-4 mr-2" />
                            {coin.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoinDropdown;
