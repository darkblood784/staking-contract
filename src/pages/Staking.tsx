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
import WhaleSlider from "../components/SliderComponent";

import CoinDropdown from '../components/CoinDropdown';
import ChildComponent1 from '../components/child1';
import ChildComponent2 from '../components/child2';
import ChildComponent3 from '../components/child3';

//new design
import usdtIcon from '../assets/usdt.png';
import btcIcon from '../assets/btc.png';
import ethIcon from '../assets/eth.png';


interface WhaleImagePaths {
    "0-25": string;
    "25-75": string;
    "75-100": string;
}

interface BlinkingUnderscoreInputProps {
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validatePrime: () => void;
}

const headImages: WhaleImagePaths = {
    "0-25": './whale/tailwhale.png',
    "25-75": './whale/25-75.png',
    "75-100": './whale/75-100.png'
};




// Blinking Underscore Input Component
const BlinkingUnderscoreInput: React.FC<BlinkingUnderscoreInputProps> = ({ inputValue, handleInputChange, validatePrime }) => {
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink((prevBlink) => !prevBlink);
        }, 400); // Toggle blink every 500ms

        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);

    return (
        <div className="relative">
            <input
                type="text"
                pattern="[0-9.]*"
                className="text-white outline-none rounded text-right p-2 text-2xl"
                value={inputValue}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    caretColor: 'transparent',
                 }}
                onChange={handleInputChange}
                onBlur={validatePrime}
            />
            {/* Only show blinking underscore when inputValue is empty */}
            {inputValue === '' && (
                <span
                    style={{
                        visibility: blink ? 'visible' : 'hidden',
                        fontSize: '2rem',  // Match the font size of the input
                        position: 'absolute',
                        bottom: '8px',  // Adjust to vertically align with text
                        right: '10px',  // Adjust to horizontally align with text
                    }}
                >
                    _
                </span>
            )}
        </div>
    );
};


function Staking() {
    const [showImage, setShowImage] = useState(false);
    const { t, i18n } = useTranslation();


    // Define the type for allowed coin values
    type Coin = 'ETH' | 'USDT' | 'BTC';

    // Manage selected coin (ETH, USDT, BTC)
    const [selectedCoin, setSelectedCoin] = useState<Coin>('ETH');
    const [isOpen, setIsOpen] = useState(false); // Move isOpen state here

    // Coin-specific staking values
    const stakingData: Record<Coin, { amount: string }> = {
        ETH: { amount: '$91,883' },
        USDT: { amount: '$1.2 M' },
        BTC: { amount: '$50,000' },
    };


    //new design
    const tokens = [
        { name: 'USDT', icon: usdtIcon },
        { name: 'Bitcoin', icon: btcIcon },
        { name: 'Ethereum', icon: ethIcon }
    ];

    const durations = ['30 Days', '6 Months', '1 Year'];

    const Staking = () => {
        const { t } = useTranslation();
        const [selectedToken, setSelectedToken] = useState(tokens[0].name);
        const [duration, setDuration] = useState(durations[0]);
        const [sliderValue, setSliderValue] = useState(0);
        const [stakeAmount, setStakeAmount] = useState('');
    };

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
    const [sliderValueusdt, setSliderValueusdt] = useState<number>(0);
    const [sliderValuebtc, setSliderValuebtc] = useState<number>(0);
    const [sliderValueeth, setSliderValueeth] = useState<number>(0);

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

    const getWhaleHeadSrcusdt = (): string => {
        if (sliderValueusdt <= 25) return headImages["0-25"];
        if (sliderValueusdt <= 75) return headImages["25-75"];
        return headImages["75-100"];
    };

    const getWhaleHeadSrcbtc = (): string => {
        if (sliderValuebtc <= 25) return headImages["0-25"];
        if (sliderValuebtc <= 75) return headImages["25-75"];
        return headImages["75-100"];
    };

    const getWhaleHeadSrceth = (): string => {
        if (sliderValueeth <= 25) return headImages["0-25"];
        if (sliderValueeth <= 75) return headImages["25-75"];
        return headImages["75-100"];
    };



    return (
        <div className={`flex flex-col w-full items-center text-white ${fontClass}`}>
            <div className="relative flex flex-col lg:flex-row h-screen w-full items-center text-[40px] my-[20px] md:my-0 md:text-[80px] justify-between px-6">
                
                {/* Background Whale Image */}
                <img src={banner} alt="Whale" className="absolute whale-image w-full h-auto object-cover max-h-[100vh] lg:max-h-[90vh] xl:max-h-[100vh] top-[30vh] left-[-10vw] md:top-[15vh] md:left-[-5vw]" />

                {/* Left side: Banner and Text */}
                <div className="relative z-10 left-section flex flex-col justify-center items-start w-full md:w-2/3 h-full px-4 mb-[-40px] top-[-20px]">
                    <h1 className="font-bold text-shadow-customh">{t('swim')}</h1>
                    <h1 className="font-bold text-shadow-customh">{t('earn')}</h1>
                    <p className="mt-4 text-[15px] md:text-[25px] text-shadow-customp">{t('Join')}</p>

                    {/* Get Started Button */}
                    <div className="mt-6">
                        <a href="#choose-plan" className="custom-btn no-underline">{t('Get_started')}</a>
                    </div>
                </div>

                {/* Right side: Staking Box */}
                <div className="relative z-10 right-section staking-box w-full md:w-1/3 max-w-[500px] mx-auto">
                    <img src={Hover_image} alt="Whale Box" className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px]" />
                    
                    {/* Layering the text on top of the image */}
                    <div className="absolute top-0 left-0 p-4 sm:p-6 text-white w-full">
                        <div className="mb-4">
                            <h2 className="top-3 font-bold text-[1vw]">{t('Total Staked')}</h2>
                            
                            {/* CoinDropdown with consistent positioning */}
                            <div className="absolute top-[3vw] mt-[5vw] right-[3vw] flex items-center justify-between w-[80%]">
                                <p className="text-[2vw] font-bold">{stakingData[selectedCoin].amount}</p>
                                <div className="flex items-center group">
                                    <CoinDropdown selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
                                </div>
                            </div>
                            <p className="absolute top-[1vw] right-[2vw] bg-white text-black font-bold rounded px-2 text-[1.5vw]">$289.38m</p>
                        </div>
                        <div className="mb-4 mt-[10vw]">
                            <h2 className="font-bold text-[1.5vw] text-yellow-500">{t('Estimated Rewards')}</h2>
                            <p className="text-[3vw] font-bold">31%</p>
                            <p className="text-[1.5vw] font-bold">APR</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between w-full">
                <h1 className="flex md:text-[60px] text-[30px] font-bold text-shadow-customh">{t('trading')}</h1>
                <p className="md:text-[20px] text-[13px] items-end flex text-shadow-customp">{t('risk')}</p>
            </div>

            //new design
            <div className="staking-page flex flex-col items-center text-white w-full px-6">

                <div className="mt-10 w-full max-w-[800px]">
                    {/* Token Selector */}
                    <div className="flex justify-around mb-6">
                        {tokens.map((token) => (
                            <button
                                key={token.name}
                                className={`token-btn ${selectedToken === token.name ? 'active' : ''}`}
                                onClick={() => setSelectedToken(token.name)}
                            >
                                <img src={token.icon} alt={token.name} className="w-8 h-8 mr-2" />
                                {token.name}
                            </button>
                        ))}
                    </div>

                    {/* Whale Slider and Amount */}
                    <div className="whale-slider-section bg-[#2c2d30] p-4 rounded-lg">
                        <div className="flex justify-between mb-4">
                            <p className="text-lg">{t('Amount')}: {stakeAmount} {selectedToken}</p>
                            <input
                                type="text"
                                className="amount-input text-black p-2 rounded"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                            />
                        </div>
                        <div className="whale-slider">
                            <WhaleSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
                        </div>
                    </div>

                    {/* Duration Selector */}
                    <div className="flex justify-around mt-6">
                        {durations.map((dur) => (
                            <button
                                key={dur}
                                className={`duration-btn ${duration === dur ? 'active' : ''}`}
                                onClick={() => setDuration(dur)}
                            >
                                {dur}
                            </button>
                        ))}
                    </div>

                    {/* Stake Button */}
                    <div className="flex justify-center mt-6">
                        <button className="stake-btn">
                            {t('Stake')}
                        </button>
                    </div>
                </div>

                {/* Whale Background */}
                <div className="flex flex-col items-center mt-10 w-full h-auto">
                    <img src={bg_whale} className="w-full h-auto" alt="Whale Background" />
                </div>
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
                    <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
                        <div className="flex justify-between">
                            <p className="text-[25px] md">{t('stake')}</p>
                            <BlinkingUnderscoreInput
                                inputValue={inputValue1}
                                handleInputChange={(e) => handleInputChange(e, setInputValue1)}
                                validatePrime={() => validatePrime(inputValue1, setInputValue1)}
                            />
                        </div>
                        <div className="flex w-full justify-between">
                            <p className="text-[25px] md">{usdtduration ? usdtduration : "0 Days"}</p>
                            <div className="text-2xl mt-2.5">{`${Math.round(sliderValueusdt)}%`}</div>
                        </div>
                        <WhaleSlider
                            sliderValue={sliderValueusdt}
                            setSliderValue={setSliderValueusdt}
                            getWhaleHeadSrc={getWhaleHeadSrcusdt}
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