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

    const percentages = ['25%', '50%', '75%', 'ALL IN'];

    // Handle input changes with validation
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        const value = e.target.value;
        const validValue = value.replace(/[^0-9.]/g, '');  // Allow only digits and single decimal point
        setter(validValue);
    };

    // Select percentages for each section
    const handleSelect1 = (percentage: string) => setSelectedPercentage1(percentage);
    const handleSelect2 = (percentage: string) => setSelectedPercentage2(percentage);
    const handleSelect3 = (percentage: string) => setSelectedPercentage3(percentage);

    // Animation Effect for showing images (optional based on requirement)
    useEffect(() => {
        const timer1 = setTimeout(() => {}, 0.5);  // Smooth transition placeholder
        return () => clearTimeout(timer1);
    }, [selectedPercentage1, selectedPercentage2, selectedPercentage3]);

    return (
        <div className="flex flex-col w-full items-center text-white">
            {/* Banner Section */}
            <div className="flex h-screen w-full items-center text-[40px] my-[20px] md:my-0 md:text-[80px] relative justify-center">
                <img src={banner} alt="Whale" className="absolute w-full h-[100%] my-[20px] md:h-[auto]" />
                <div className="relative z-10 flex flex-col justify-center items-start w-full h-full px-4 mb-[-40px]">
                    <h1 className="font-bold">{t('swim')}</h1>
                    <h1 className="font-bold">{t('earn')}</h1>
                    <p className="mt-4 text-[15px] md:text-[25px]">{t('Join')}</p>
                </div>
            </div>

            <div className="flex justify-between w-full">
                <h1 className="flex md:text-[60px] text-[30px] font-bold">{t('trading')}</h1>
                <p className="md:text-[20px] text-[13px] items-end flex">{t('risk')}</p>
            </div>

            {/* USDT Staking Section */}
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={usdtbackground} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={usdt} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">USDT</p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white">
                            {/* Duration Buttons */}
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setUsdtDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('day')}</div>
                                <p className="text-[20px] md:text-[30px]">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setUsdtDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('month')}</div>
                                <p className="text-[20px] md:text-[30px]">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setUsdtDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('year')}</div>
                                <p className="text-[20px] md:text-[30px]">36%</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between ">
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
                        <ChildComponent1
                            percentages={percentages}
                            selectedPercentage={selectedPercentage1}
                            handleSelect={handleSelect1}
                            showImage={true}
                        />
                    </div>

                    <div className="w-full h-20 md:w-1/4 md:h-full opacity-20 bg-black rounded-2xl flex justify-center items-center cursor-pointer">
                        <p className="text-[35px] md:text-[30px] font-bold">{t('take')} <span className="ml-2">&#9660;</span></p>
                    </div>
                </div>
            </div>

            {/* Bitcoin Staking Section */}
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={btcbg} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={btc} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">Bitcoin</p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white">
                            {/* Duration Buttons */}
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setBtcDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('day')}</div>
                                <p className="text-[20px] md:text-[30px]">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setBtcDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('month')}</div>
                                <p className="text-[20px] md:text-[30px]">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setBtcDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('year')}</div>
                                <p className="text-[20px] md:text-[30px]">36%</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between ">
                            <p className="text-[25px]">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-white bg-transparent border border-white outline-none rounded text-right p-2"
                                value={inputValue2}
                                placeholder={t("Enter amount to stake")}
                                onChange={(e) => handleInputChange(e, setInputValue2)}
                            />
                        </div>
                        <p className="text-[25px]">{btcduration ? btcduration : "0 Days"}</p>
                        <ChildComponent2
                            percentages={percentages}
                            selectedPercentage={selectedPercentage2}
                            handleSelect={handleSelect2}
                            showImage={true}
                        />
                    </div>

                    <div className="w-full h-20 md:w-1/4 md:h-full opacity-20 bg-black rounded-2xl flex justify-center items-center cursor-pointer">
                        <p className="text-[35px] md:text-[30px] font-bold">{t('take')} <span className="ml-2">&#9660;</span></p>
                    </div>
                </div>
            </div>

            {/* Ethereum Staking Section */}
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={ethbg} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={eth} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">Ethereum</p>
                        </div>
                        <div className="flex mt-5 w-full justify-between text-white">
                            {/* Duration Buttons */}
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setEthDuration(t('day'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('day')}</div>
                                <p className="text-[20px] md:text-[30px]">15%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setEthDuration(t('month'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('month')}</div>
                                <p className="text-[20px] md:text-[30px]">24%</p>
                            </div>
                            <div className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer hover:bg-white hover:text-black transition" onClick={() => setEthDuration(t('year'))}>
                                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl">{t('year')}</div>
                                <p className="text-[20px] md:text-[30px]">36%</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between ">
                            <p className="text-[25px]">{t('stake')}</p>
                            <input
                                type="text"
                                pattern="[0-9.]*"
                                className="text-white bg-transparent border border-white outline-none rounded text-right p-2"
                                value={inputValue3}
                                placeholder={t("Enter amount to stake")}
                                onChange={(e) => handleInputChange(e, setInputValue3)}
                            />
                        </div>
                        <p className="text-[25px]">{ethduration ? ethduration : "0 Days"}</p>
                        <ChildComponent3
                            percentages={percentages}
                            selectedPercentage={selectedPercentage3}
                            handleSelect={handleSelect3}
                            showImage={true}
                        />
                    </div>

                    <div className="w-full h-20 md:w-1/4 md:h-full opacity-20 bg-black rounded-2xl flex justify-center items-center cursor-pointer">
                        <p className="text-[35px] md:text-[30px] font-bold">{t('take')} <span className="ml-2">&#9660;</span></p>
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
