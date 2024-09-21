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
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [inputValue3, setInputValue3] = useState('');
    const [usdtduration, setUsdtDuration] = useState("");
    const [btcduration, setBtcDuration] = useState("");
    const [ethduration, setEthDuration] = useState("");
    const [progressUSDT, setProgressUSDT] = useState(0);
    const [progressBTC, setProgressBTC] = useState(0);
    const [progressETH, setProgressETH] = useState(0);
    const percentages = ['25%', '50%', '75%', 'ALL IN'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        const value = e.target.value;
        const validValue = value.replace(/[^0-9.]/g, '');
        setter(validValue);
    };

    // Wallet connection feedback (for UI)
    const [walletConnected, setWalletConnected] = useState(false);
    const handleWalletConnect = () => {
        setWalletConnected(true);
    };

    return (
        <div className="flex flex-col w-full items-center text-white">
            <div className="flex h-screen w-full items-center text-[40px] my-[20px] md:my-0 md:text-[80px] relative justify-center">
                <img src={banner} alt="Whale" className="absolute w-full h-[100%] my-[20px] md:h-[auto]" />
                <div className="relative z-10 flex flex-col justify-center items-start w-full h-full px-4 mb-[-40px]">
                    <h1 className="font-bold">{t('swim')}</h1>
                    <h1 className="font-bold">{t('earn')}</h1>
                    <p className="mt-4 text-[15px] md:text-[25px]">{t('Join')}</p>
                </div>
            </div>

            <div className="flex flex-wrap w-full relative mt-10">
                {/* USDT Staking Section */}
                <img src={usdtbackground} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10 ">
                        <div className="flex items-center">
                            <img src={usdt} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">USDT</p>
                        </div>
                        <div className="tooltip">
                            <div className="progress-bar">
                                <div className="progress-bar-filled" style={{ width: `${progressUSDT}%` }}></div>
                            </div>
                            <span className="tooltiptext">{t('Progress of staking USDT')}</span>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between ">
                            <p className="text-[25px]">{t('stake')}</p>
                            <input
                                type="text"
                                className="input-box"
                                placeholder="Enter amount to stake"
                                value={inputValue1}
                                onChange={(e) => handleInputChange(e, setInputValue1)}
                            />
                        </div>
                        <ChildComponent1 percentages={percentages} />
                    </div>
                </div>
            </div>

            {/* BTC Staking Section */}
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={btcbg} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={btc} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">Bitcoin</p>
                        </div>
                        <div className="tooltip">
                            <div className="progress-bar">
                                <div className="progress-bar-filled" style={{ width: `${progressBTC}%` }}></div>
                            </div>
                            <span className="tooltiptext">{t('Progress of staking BTC')}</span>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between">
                            <p className="text-[25px]">{t('stake')}</p>
                            <input
                                type="text"
                                className="input-box"
                                placeholder="Enter amount to stake"
                                value={inputValue2}
                                onChange={(e) => handleInputChange(e, setInputValue2)}
                            />
                        </div>
                        <ChildComponent2 percentages={percentages} />
                    </div>
                </div>
            </div>

            {/* ETH Staking Section */}
            <div className="flex flex-wrap w-full relative mt-10">
                <img src={ethbg} className="absolute w-full h-full" alt="" />
                <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
                    <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10">
                        <div className="flex items-center">
                            <img src={eth} alt="" className="w-14 h-14 mr-4" />
                            <p className="text-[35px] md:text-[30px] font-bold flex">Ethereum</p>
                        </div>
                        <div className="tooltip">
                            <div className="progress-bar">
                                <div className="progress-bar-filled" style={{ width: `${progressETH}%` }}></div>
                            </div>
                            <span className="tooltiptext">{t('Progress of staking ETH')}</span>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between ">
                            <p className="text-[25px]">{t('stake')}</p>
                            <input
                                type="text"
                                className="input-box"
                                placeholder="Enter amount to stake"
                                value={inputValue3}
                                onChange={(e) => handleInputChange(e, setInputValue3)}
                            />
                        </div>
                        <ChildComponent3 percentages={percentages} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Staking;
