import React from 'react';

import usdtIcon from '../assets/usdt.png';
import btcIcon from '../assets/btc.png';
import ethIcon from '../assets/eth.png';

type Coin = 'ETH' | 'USDT' | 'BTC';

interface CoinDropdownProps {
    selectedCoin: Coin;
    setSelectedCoin: (coin: Coin) => void;
}

// Corrected CoinDropdown Component
const CoinDropdown: React.FC<CoinDropdownProps> = ({ selectedCoin, setSelectedCoin }) => {
    // Define coins with name and icon properties
    const coins = [
        { name: 'USDT', icon: usdtIcon },
        { name: 'BTC', icon: btcIcon },
        { name: 'ETH', icon: ethIcon },
    ];

    return (
        <div className="flex items-center">
            {/* Coin Icon */}
            <img
                src={coins.find(coin => coin.name === selectedCoin)?.icon}
                alt={selectedCoin}
                className="w-6 h-6 mr-2"
            />
            {/* Coin Dropdown */}
            <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value as Coin)} // Cast value as 'Coin'
                className="font-cubic text-[2vw] ml-1"
            >
                {/* Dynamically render the options */}
                {coins.map((coin) => (
                    <option key={coin.name} value={coin.name}>
                        {coin.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CoinDropdown;
