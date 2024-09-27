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
        <div className="relative flex items-center space-x-2"> {/* Align items with space between */}
            <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value as Coin)}
                className="appearance-none bg-transparent font-cubic text-[1.5vw] flex items-center outline-none pr-6"
                style={{ backgroundColor: 'transparent', color: '#5170fd' }}
            >
                {coins.map((coin) => (
                    <option key={coin.name} value={coin.name} className="bg-black text-white flex items-center">
                        <img src={coin.icon} alt={coin.name} className="w-4 h-4 mr-2 inline" />
                        {coin.name}
                    </option>
                ))}
            </select>

            {/* Smaller dropdown arrow */}
            <span className="ml-1" style={{ color: '#5170fd', fontSize: '1.2vw' }}>
                &#x25BC;
            </span>
        </div>
    );
};

export default CoinDropdown;