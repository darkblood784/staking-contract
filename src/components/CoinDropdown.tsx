import React from 'react';

import usdtIcon from '../assets/usdt.png';
import btcIcon from '../assets/btc.png';
import ethIcon from '../assets/eth.png';

type Coin = 'ETH' | 'USDT' | 'BTC';

interface CoinDropdownProps {
    selectedCoin: Coin;
    setSelectedCoin: (coin: Coin) => void;
}

const CoinDropdown: React.FC<CoinDropdownProps> = ({ selectedCoin, setSelectedCoin }) => {
    const coins = [
        { name: 'USDT', icon: usdtIcon },
        { name: 'BTC', icon: btcIcon },
        { name: 'ETH', icon: ethIcon },
    ];

    return (
        <div className="relative flex items-center space-x-2">
            <div className="flex items-center">
                {/* Dropdown field with icon inside */}
                <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value as Coin)}
                    className="appearance-none bg-transparent font-cubic text-[1.5vw] outline-none pr-6 flex items-center"
                    style={{ color: '#5170fd' }}
                >
                    {coins.map((coin) => (
                        <option key={coin.name} value={coin.name} className="bg-black text-white flex items-center">
                            {coin.name}
                        </option>
                    ))}
                </select>

                {/* Coin Icon */}
                <img
                    src={coins.find(coin => coin.name === selectedCoin)?.icon}
                    alt={selectedCoin}
                    className="w-5 h-5 ml-2"
                />
            </div>

            {/* Smaller dropdown arrow */}
            <span className="ml-1" style={{ color: '#5170fd', fontSize: '1.2vw' }}>
                &#x25BC;
            </span>
        </div>
    );
};

export default CoinDropdown;
