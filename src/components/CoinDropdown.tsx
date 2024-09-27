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
    const coins = [
        { name: 'USDT', icon: usdtIcon },
        { name: 'BTC', icon: btcIcon },
        { name: 'ETH', icon: ethIcon },
    ];

    return (
        <div className="relative flex items-center">
            {/* Dropdown with transparent background and custom styles */}
            <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value as Coin)}
                className="appearance-none bg-transparent font-cubic text-[2vw] flex items-center outline-none"
                style={{ backgroundColor: 'transparent', color: '#5170fd' }}
            >
                {coins.map((coin) => (
                    <option key={coin.name} value={coin.name} className="bg-black text-white">
                        {coin.name}
                    </option>
                ))}
            </select>

            {/* Coin Icon, aligned with the dropdown */}
            <img
                src={coins.find(coin => coin.name === selectedCoin)?.icon}
                alt={selectedCoin}
                className="w-6 h-6 ml-2"
            />

            {/* Dropdown arrow */}
            <span className="ml-1" style={{ color: '#5170fd' }}>
                &#x25BC;
            </span>
        </div>
    );
};

export default CoinDropdown;
