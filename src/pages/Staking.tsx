import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import banner from '../assets/banner.png';
import usdtbackground from '../assets/usdtplanbackground.png';
import btcbg from '../assets/bitcoinplanbackground.png';
import ethbg from '../assets/ethereumplanbackground.png';
import usdt from '../assets/usdt.png';
import btc from '../assets/btc.png';
import eth from '../assets/eth.png';
import bg_whale from '../assets/bg-whale.png';
import linktree from '../assets/social/linktree.png';
import discord from '../assets/social/discord.png';
import symbol from '../assets/symbol.png';
import WhaleSlider from '../components/WhaleSlider';
import whaleTail from '../assets/whale/Tail.png';  // Whale images
import whaleBody from '../assets/whale/Body.png';
import whaleHead0_25 from '../assets/whale/0_25.png';
import whaleHead25_75 from '../assets/whale/25_75.png';
import whaleHead75_100 from '../assets/whale/75_100.png';
import React from 'react';

// Define the types for the props
interface WhaleSliderProps {
  selectedPercentage: string;
  handleSelect: (percentage: string) => void;
}

// Whale Slider Component with TypeScript
const WhaleSlider: React.FC<WhaleSliderProps> = ({ selectedPercentage, handleSelect }) => {
    const [sliderValue, setSliderValue] = useState<number>(0); // Whale slider value

    const whaleHeadImages = {
        "0-25": whaleHead0_25,
        "25-75": whaleHead25_75,
        "75-100": whaleHead75_100
    };

    const getWhaleHeadImage = () => {
        if (sliderValue <= 25) return whaleHeadImages["0-25"];
        if (sliderValue <= 75) return whaleHeadImages["25-75"];
        return whaleHeadImages["75-100"];
    };

    // Handle slider change
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseInt(e.target.value));
    };

    useEffect(() => {
        if (selectedPercentage) {
            setSliderValue(parseInt(selectedPercentage));
        }
    }, [selectedPercentage]);

    return (
        <div className="whale-slider-container">
            <div className="slider-container relative w-full h-24">
                <img src={whaleTail} alt="Whale Tail" className="whale-tail" />
                <div className="whale-body" style={{ width: `${sliderValue * 3}px` }}></div>
                <img
                    src={getWhaleHeadImage()}
                    alt="Whale Head"
                    className="whale-head"
                    style={{ left: `${70 + sliderValue * 3}px` }}
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="slider-range"
                />
            </div>
            <div className="text-center mt-2">
                <p>{sliderValue}%</p>
            </div>

            <div className="buttons-container mt-5 flex justify-between">
                {['25%', '50%', '75%', 'ALL IN'].map((percentage, idx) => (
                    <button
                        key={idx}
                        className="bg-gray-700 px-4 py-2 rounded-full"
                        onClick={() => handleSelect(percentage)}
                    >
                        {percentage}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WhaleSlider;


// Main Staking Component
function Staking() {
    const { t } = useTranslation();
    const [usdtduration, setUsdtDuration] = useState("");
    const [btcduration, setBtcDuration] = useState("");
    const [ethduration, setEthDuration] = useState("");
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');

    const [selectedPercentage1, setSelectedPercentage1] = useState("");
    const [selectedPercentage2, setSelectedPercentage2] = useState("");
    const [selectedPercentage3, setSelectedPercentage3] = useState("");

    const handleSelect1 = (percentage: string) => {
        setSelectedPercentage1(percentage);
    };

    const handleSelect2 = (percentage: string) => {
        setSelectedPercentage2(percentage);
    };

    const handleSelect3 = (percentage: string) => {
        setSelectedPercentage3(percentage);
    };

    return (
        <div className="flex flex-col w-full items-center text-white">
            {/* Header Section */}
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
                <img src={usdtbackground} className="absolute w-full h-full" alt="USDT Background" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={usdt} alt="USDT" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">USDT</p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white">
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setUsdtDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('day')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setUsdtDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('month')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setUsdtDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('year')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">36%</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between">
                            <p className="text-[25px] md">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-black outline-none rounded text-right p-2"
                                value={inputValue1}
                                onChange={(e) => setInputValue1(e.target.value)}
                            />
                        </div>
                        <div>
                            <p className="text-[25px] md">{usdtduration ? usdtduration : "0 Days"}</p>
                        </div>
                        {/* Whale Slider for USDT */}
                        <WhaleSlider selectedPercentage={selectedPercentage1} handleSelect={handleSelect1} />
                    </div>
                </div>
            </div>

            {/* Bitcoin Section */}
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={btcbg} className="absolute w-full h-full" alt="BTC Background" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={btc} alt="BTC" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">Bitcoin</p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white">
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setBtcDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('day')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setBtcDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('month')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setBtcDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('year')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">36%</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between">
                            <p className="text-[25px] md">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-black outline-none rounded text-right p-2"
                                value={inputValue2}
                                onChange={(e) => setInputValue2(e.target.value)}
                            />
                        </div>
                        <div>
                            <p className="text-[25px] md">{btcduration ? btcduration : "0 Days"}</p>
                        </div>
                        {/* Whale Slider for Bitcoin */}
                        <WhaleSlider selectedPercentage={selectedPercentage2} handleSelect={handleSelect2} />
                    </div>
                </div>
            </div>

            {/* Ethereum Section */}
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={ethbg} className="absolute w-full h-full" alt="ETH Background" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={eth} alt="ETH" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">Ethereum</p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white">
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setEthDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('day')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setEthDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('month')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={() => setEthDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('year')}</div>
                                <p className="text-[20px] md:text-[30px] my-auto">36%</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between">
                            <p className="text-[25px] md">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-black outline-none rounded text-right p-2"
                                value={inputValue3}
                                onChange={(e) => setInputValue3(e.target.value)}
                            />
                        </div>
                        <div>
                            <p className="text-[25px] md">{ethduration ? ethduration : "0 Days"}</p>
                        </div>
                        {/* Whale Slider for Ethereum */}
                        <WhaleSlider selectedPercentage={selectedPercentage3} handleSelect={handleSelect3} />
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex flex-col my-10 w-full h-auto bg-black">
                <img src={bg_whale} className="w-full h-auto" alt="" />
                <p className="lg:pl-20 pl-10 mt-[-90px] lg:mt-[-200px] text-[18px] md:text-[40px] font-bold lg:text-[51px]">{t('crypto')}</p>
            </div>
            <div className="flex w-full bg-black mt-10 lg:mt-40 justify-between">
                <a href="https://linktr.ee/WHALESTRATEGY" className="w-[45%] lg:w-[45%]">
                    <img src={linktree} alt="Linktree" className="w-full h-auto cursor-pointer" />
                </a>
                <a href="https://discord.gg/xpkF6U9KJY" className="w-[45%] lg:w-[45%]">
                    <img src={discord} alt="Discord" className="w-full h-auto cursor-pointer" />
                </a>
            </div>
            <div className="w-full h-40"></div>
        </div>
    )
}

export default Staking;
