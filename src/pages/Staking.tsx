import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import banner from '../assets/Whale_Strategy.png';
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
import getStartedButton from '../assets/buttons/Get_Started.png';
import Hover_image from '../assets/buttons/Hover_image.png';

import ChildComponent1 from '../components/child1';
import ChildComponent2 from '../components/child2';
import ChildComponent3 from '../components/child3';



function Staking() {
    const [showImage, setShowImage] = useState(false);
    const { t, i18n } = useTranslation();

    // Dynamically assign the font class based on the language
    const fontClass = i18n.language === 'en' ? 'font-cubic' : 'font-cubic';
    const [amount, setAmount] = useState("");
    const [usdtduration, setUsdtDuration] = useState("");
    const [btcduration, setBtcDuration] = useState("");
    const [ethduration, setEthDuration] = useState("");
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [address, setAddress] = useState("");

    const percentages = ['25%', '50%', '75%', 'ALL IN'];
    const [selectedPercentage1, setSelectedPercentage1] = useState("");
    const [showImage1, setShowImage1] = useState(false);
    const [selectedPercentage2, setSelectedPercentage2] = useState("");
    const [showImage2, setShowImage2] = useState(false);
    const [selectedPercentage3, setSelectedPercentage3] = useState("");
    const [showImage3, setShowImage3] = useState(false);

    const isPrime = (num: number): boolean => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    };

    const validatePrime = (value: string, setter: (value: string) => void) => {
        const num = Number(value);
        if (num !== Math.floor(num)) { // Checks if the number is not an integer
            return; // Do not clear because decimals are allowed
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        const value = e.target.value;
        // Allow only digits and a single decimal point
        const validValue = value.replace(/[^0-9.]/g, '');
        const parts = validValue.split('.');
        if (parts.length > 2) { // More than one decimal point is present
            // Join the parts to keep only one decimal point and discard the rest
            setter(parts.slice(0, 2).join('.') + parts.slice(2).join(''));
        } else {
            setter(validValue);
        }
    };

    useEffect(() => {
        setShowImage1(false);
        const timer1 = setTimeout(() => setShowImage1(true), 0.5);
        return () => clearTimeout(timer1);
    }, [selectedPercentage1]);

    useEffect(() => {
        setShowImage2(false);
        const timer2 = setTimeout(() => setShowImage2(true), 0.5);
        return () => clearTimeout(timer2);
    }, [selectedPercentage2]);

    useEffect(() => {
        setShowImage3(false);
        const timer3 = setTimeout(() => setShowImage3(true), 0.5);
        return () => clearTimeout(timer3);
    }, [selectedPercentage3]);

    const handleSelect1 = (percentage: string) => {
        setSelectedPercentage1(percentage);
    };

    const handleSelect2 = (percentage: any) => {
        setSelectedPercentage2(percentage);
    };

    const handleSelect3 = (percentage: any) => {
        setSelectedPercentage3(percentage);
    };



    return (
        <div className={`flex flex-col w-full items-center text-white ${fontClass}`}>
            <div className="relative flex h-screen w-full items-center text-[40px] my-[20px] md:my-0 md:text-[80px] justify-between px-6">
                {/* Background Whale Image */}
                <img src={banner} alt="Whale" className="absolute w-full h-auto max-h-screen object-cover top-[300px] bottom-0 left-[-100px]"/>

                {/* Left side: Banner and Text */}
                <div className="relative z-10 flex flex-col justify-center items-start w-full md:w-2/3 h-full px-4 mb-[-40px] top-[-20px]">
                    <h1 className="font-bold text-shadow-customh">{t('swim')}</h1>
                    <h1 className="font-bold text-shadow-customh">{t('earn')}</h1>

                    <p className="mt-4 text-[15px] md:text-[25px] text-shadow-customp">{t('Join')}</p>

                    {/* Get Started Button */}
                    <div className="mt-6">
                        <a href="#choose-plan" className="custom-btn no-underline">{t('Get_started')}</a>
                    </div>
                </div>

                {/* Right side: Staking Box on Top of the Background */}
                <div className="relative z-10 w-full md:w-1/3 max-w-[400px] mx-auto">
                    {/* The image should take up a responsive width */}
                    <img src={Hover_image} alt="Whale Box" className="w-full h-auto object-contain max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]" />
                    
                    {/* Layering the text on top of the image */}
                    <div className="absolute top-0 left-0 p-4 sm:p-6 text-white w-ful">
                        <div className="mb-4">
                            <h2 className="top-3 font-bold text-lg md:text-xl lg:text-xl">{t('Total Staked')}</h2>
                            <p className="text-xl md:text-2xl lg:text-3xl font-bold top-[800px]">91,883</p>
                            <p className="absolute top-[2px] right-0 flex items-center">ETH <span className="text-sm ml-1">&#x25BC;</span></p>
                            <p className="absolute top-[-25px] right-[-150px] bg-white text-black rounded px-2 text-sm md:text-base">$289.38m</p>
                        </div>
                        <div className="mb-4 mt-20">
                            <h2 className="font-bold text-md sm:text-lg lg:text-xl text-yellow-500 ">{t('Estimated Rewards')}</h2>
                            <p className="text-xl sm:text-3xl lg:text-3xl font-bold">31%</p>
                            <p className="text-xl sm:text-xl lg:text-2xl font-bold">APR</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-full">
                <h1 className="flex md:text-[60px] text-[30px] font-bold text-shadow-customh">{t('trading')}</h1>
                <p className="md:text-[20px] text-[13px] items-end flex text-shadow-customp">{t('risk')}</p>
            </div>
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={usdtbackground} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10 ">
                        <div className="flex items-center">
                            <img src={usdt} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex text-shadow-customh">USDT </p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white text-shadow-customp">
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setUsdtDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('day')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setUsdtDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('month')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setUsdtDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('year')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">36%</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5 text-shadow-customp">
                        <div className="flex justify-between ">
                            <p className="text-[25px] md">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-black outline-none rounded text-right p-2"
                                value={inputValue1}
                                onChange={(e) => handleInputChange(e, setInputValue1)}
                                onBlur={() => validatePrime(inputValue1, setInputValue1)}
                            />

                        </div>
                        <div>
                            <p className="text-[25px] md text-shadow-customp">{usdtduration ? usdtduration : "0 Days"}</p>
                            <p></p>
                        </div>
                        <ChildComponent1
                            percentages={percentages}
                            selectedPercentage={selectedPercentage1}
                            handleSelect={handleSelect1}
                            showImage={showImage1}
                        />
                    </div>

                    <div className="text-shadow-customp w-full h-20 md:w-1/4 md:h-full opacity-20 bg-black rounded-2xl flex justify-center items-center cursor-pointer">
                        <p className="text-[35px] md:text-[30px] font-bold">{t('take')} <span className="ml-2">&#9660;</span></p>
                    </div>
                </div>

            </div>
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={btcbg} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={btc} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold text-shadow-customh flex">Bitcoin
                                <sup>
                                    <button title={t('wbtc')}>

                                    <img src={symbol} className="ml-4" alt="" />
                                    </button>
                                </sup>
                            </p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white text-shadow-customp">
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setBtcDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('day')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setBtcDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('month')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setBtcDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('year')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">36%</p>
                            </div>


                        </div>

                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5 text-shadow-customp">
                        <div className="flex justify-between ">
                            <p className="text-[25px] md">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-black outline-none rounded text-right p-2"
                                value={inputValue2}
                                onChange={(e) => handleInputChange(e, setInputValue2)}
                                onBlur={() => validatePrime(inputValue2, setInputValue2)}
                            />
                        </div>
                        <div>
                            <p className="text-[25px] text-shadow-customp md">{btcduration ? btcduration : "0 Days"}</p>
                            <p></p>
                        </div>
                        <ChildComponent2
                            percentages={percentages}
                            selectedPercentage={selectedPercentage2}
                            handleSelect={handleSelect2}
                            showImage={showImage2}
                        />
                    </div>

                    <div className="w-full h-20 md:w-1/4 md:h-full opacity-20 bg-black rounded-2xl flex justify-center items-center cursor-pointer">
                        <p className="text-[35px] md:text-[30px] font-bold text-shadow-customp">{t('take')} <span className="ml-2">&#9660;</span></p>
                    </div>
                </div>

            </div>
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={ethbg} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={eth} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold text-shadow-customh flex">Ethereum
                                <sup>
                                    <button title={t('weth')}>

                                    <img src={symbol} className="ml-4" alt="" />
                                    </button>
                                </sup>
                            </p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-shadow-customp text-white">
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setEthDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('day')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setEthDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('month')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer" onClick={(e) => setEthDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">{t('year')}</div>
                                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">36%</p>
                            </div>

                        </div>

                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5 text-shadow-customp">
                        <div className="flex justify-between ">
                            <p className="text-[25px] md">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-black outline-none rounded text-right p-2"
                                value={inputValue3}
                                onChange={(e) => handleInputChange(e, setInputValue3)}
                                onBlur={() => validatePrime(inputValue3, setInputValue3)}
                            />
                        </div>
                        <div>
                            <p className="text-[25px] text-shadow-customp md">{ethduration ? ethduration : "0 Days"}</p>
                            <p></p>
                        </div>
                        <ChildComponent3
                            percentages={percentages}
                            selectedPercentage={selectedPercentage3}
                            handleSelect={handleSelect3}
                            showImage={showImage3}
                        />
                    </div>

                    <div className="w-full h-20 md:w-1/4 md:h-full opacity-20 bg-black rounded-2xl flex justify-center items-center cursor-pointer">
                        <p className="text-[35px] md:text-[30px] font-bold text-shadow-customp">{t('take')} <span className="ml-2">&#9660;</span></p>
                    </div>
                </div>

            </div>
            <div className="flex flex-col  my-10 w-full h-auto bg-black">
                <img src={bg_whale} className="w-full h-auto " alt="" />
                <p className="lg:pl-20 pl-10 mt-[-90px] lg:mt-[-200px] text-[18px] md:text-[40px] font-bold text-shadow-customh lg:text-[51px]">{t('crypto')}</p>
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
    )
}

export default Staking;