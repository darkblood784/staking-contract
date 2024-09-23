import '../custom.css';  // Import the custom CSS

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

import ChildComponent1 from '../components/child1';
import ChildComponent2 from '../components/child2';
import ChildComponent3 from '../components/child3';

import whaleTail from '../assets/whale/Tail.png';  // Whale images
import whaleBody from '../assets/whale/Body.png';
import whaleHead0_25 from '../assets/whale/0_25.png';
import whaleHead25_75 from '../assets/whale/25_75.png';
import whaleHead75_100 from '../assets/whale/75_100.png';

const Staking: React.FC = () => {
  const { t } = useTranslation();
  const [sliderValue, setSliderValue] = useState(0);  // Whale slider value
  const [inputValue1, setInputValue1] = useState('');
  const [selectedPercentage1, setSelectedPercentage1] = useState('');
  
  const percentages = ['25%', '50%', '75%', 'ALL IN'];

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

  const handleSelect1 = (percentage: string) => setSliderValue(parseInt(percentage));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9.]/g, '');
    setter(validValue);
  };

  return (
    <div className="flex flex-col w-full items-center text-white">
      {/* Whale Slider Section */}
      <div className="whale-slider w-full md:w-[50%] lg:pl-10 pt-16 pb-5">
        <p className="text-[25px]">{t('stake')}</p>

        {/* Whale Slider */}
        <div className="slider-container relative w-full h-24">
          <img src={whaleTail} alt="Whale Tail" className="whale-tail" />
          <div
            className="whale-body"
            style={{
              width: `${sliderValue * 3}px`,
            }}
          ></div>
          <img
            src={getWhaleHeadImage()}
            alt="Whale Head"
            className="whale-head"
            style={{
              left: `${70 + sliderValue * 3}px`
            }}
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

        {/* Percentage Selection Buttons */}
        <div className="buttons-container mt-5 flex justify-between">
          {percentages.map((percentage) => (
            <button
              key={percentage}
              className="bg-gray-700 px-4 py-2 rounded-full"
              onClick={() => handleSelect1(percentage)}
            >
              {percentage}
            </button>
          ))}
        </div>
      </div>

      {/* USDT Section */}
      <div className="flex flex-wrap w-full relative mt-10">
        <img src={usdtbackground} className="absolute w-full h-full" alt="" />
        <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
          <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
            <div className="flex items-center">
              <img src={usdt} alt="" className="w-14 h-14 mr-4" />
              <p className="text-[35px] md:text-[30px] font-bold">USDT</p>
            </div>
            <div className="flex mt-5 w-full justify-between text-white">
              <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer">
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('day')}</div>
                <p className="text-[20px] md:text-[30px] my-auto">15%</p>
              </div>
              <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer">
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('month')}</div>
                <p className="text-[20px] md:text-[30px] my-auto">24%</p>
              </div>
              <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer">
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('year')}</div>
                <p className="text-[20px] md:text-[30px] my-auto">36%</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
            <div className="flex justify-between ">
              <p className="text-[25px] md">{t('stake')}</p>
              <input
                type="text"
                pattern="[0-9.]*"
                className="text-black outline-none rounded text-right p-2"
                value={inputValue1}
                onChange={(e) => handleInputChange(e, setInputValue1)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bitcoin and Ethereum Sections */}
      {/* Similar to USDT section */}

      {/* Footer Section */}
      <div className="flex w-full bg-black mt-10 lg:mt-40 justify-between">
        <a href="https://linktr.ee/WHALESTRATEGY" className="w-[45%] lg:w-[45%]">
          <img src={linktree} alt="" className="w-full h-auto cursor-pointer" />
        </a>
        <a href="https://discord.gg/xpkF6U9KJY" className="w-[45%] lg:w-[45%]">
          <img src={discord} alt="" className="w-full h-auto cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default Staking;
