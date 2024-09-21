import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from 'react-hot-toast';

import banner from '../assets/banner.png';
import usdtbackground from '../assets/usdtplanbackground.png';
import btcbg from '../assets/bitcoinplanbackground.png';
import ethbg from '../assets/ethereumplanbackground.png';
import usdt from '../assets/usdt.png';
import btc from '../assets/btc.png';
import eth from '../assets/eth.png';
import bg_whale from '../assets/bg-whale.png';
import whaleSlider from '../assets/whale.png';  // Whale image for slider
import linktree from '../assets/social/linktree.png';
import discord from '../assets/social/discord.png';
import symbol from '../assets/symbol.png';

import ChildComponent1 from '../components/child1';
import ChildComponent2 from '../components/child2';
import ChildComponent3 from '../components/child3';

function Staking() {
    const { t } = useTranslation();
    
    // State for wallet connection
    const [walletConnected, setWalletConnected] = useState(false);

    // State for input values and percentages
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');

    // States for percentages and whale drag positioning
    const [selectedPercentage1, setSelectedPercentage1] = useState(25);  // Starting at 25%
    const [usdtduration, setUsdtDuration] = useState("");
    
    // Simulated wallet connection event
    useEffect(() => {
        if (walletConnected) {
            toast.success('Wallet Connected');
        } else {
            toast.error('Wallet Disconnected');
        }
    }, [walletConnected]);

    const toggleWalletConnection = () => {
        setWalletConnected(!walletConnected);  // Toggling wallet connection
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        const value = e.target.value;
        const validValue = value.replace(/[^0-9.]/g, '');
        setter(validValue);
    };

    // Whale slider logic
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setSelectedPercentage1(value);
    };

    return (
        <div className="flex flex-col w-full items-center text-white">
            {/* Wallet connection button for demonstration */}
            <button 
                onClick={toggleWalletConnection}
                className="mt-5 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
            >
                {walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>

            {/* Wallet connection/disconnection feedback */}
            <Toaster />

            {/* Main staking UI */}
            <div className="flex h-screen w-full items-center text-[40px] my-[20px] md:my-0 md:text-[80px] relative justify-center">
                <img src={banner} alt="Whale" className="absolute w-full h-[100%] my-[20px] md:h-[auto]" />
                <div className="relative z-10 flex flex-col justify-center items-start w-full h-full px-4 mb-[-40px]">
                    <h1 className="font-bold">{t('swim')}</h1>
                    <h1 className="font-bold">{t('earn')}</h1>
                    <p className="mt-4 text-[15px] md:text-[25px]">{t('Join')}</p>
                </div>
            </div>

            {/* USDT Section */}
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={usdtbackground} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={usdt} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">USDT</p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white">
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setUsdtDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('day')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setUsdtDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('month')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setUsdtDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('year')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">36%</p>
                            </div>
                        </div>
                    </div>

                    {/* Whale Slider */}
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between">
                            <p className="text-[25px]">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-white bg-transparent border border-white outline-none rounded text-right p-2"
                                value={inputValue1}
                                placeholder={t("Enter amount to stake")}
                                onChange={(e) => handleInputChange(e, setInputValue1)}
                            />
                        </div>
                        <p className="text-[25px]">{usdtduration ? usdtduration : "0 Days"}</p>
                        <div className="relative mt-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={selectedPercentage1}
                                onChange={handleSliderChange}
                                className="w-full appearance-none bg-gray-300 rounded h-2"
                            />
                            <img
                                src={whaleSlider}
                                alt="Whale"
                                className="absolute left-0 top-[-40px] h-[50px] transition-all"
                                style={{ left: `${selectedPercentage1}%`, transform: `translateX(-50%)` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex flex-col  my-10 w-full h-auto bg-black">
                <img src={bg_whale} className="w-full h-auto" alt="" />
                <p className="lg:pl-20 pl-10 mt-[-90px] lg:mt-[-200px] text-[18px] md:text-[40px] font-bold lg:text-[51px]">{t('crypto')}</p>
            </div>
            <div className="flex w-full bg-black mt-10 lg:mt-40 justify-between">
                <a href="https://linktr.ee/WHALESTRATEGY" className="w-[45%] lg:w-[45%]">
                    <img src={linktree} alt="" className="w-full h-auto cursor-pointer" />
                </a>
                <a href="https://discord.gg/xpkF6U9KJY" className="w-[45%] lg:w-[45%]">
                    <img src={discord} alt="" className="w-full h-auto cursor-pointer" />
                </a>
            </div>
            <div className="w-full h-40"></div>
        </div>
    );
}

export default Staking;
