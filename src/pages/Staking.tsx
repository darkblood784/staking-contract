import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import banner from "../assets/banner.png";
import usdtbackground from "../assets/usdtplanbackground.png";
import btcbg from "../assets/bitcoinplanbackground.png";
import ethbg from "../assets/ethereumplanbackground.png";
import usdt from "../assets/usdt.png";
import btc from "../assets/btc.png";
import eth from "../assets/eth.png";
import bg_whale from "../assets/bg-whale.png";
import linktree from "../assets/social/linktree.png";
import discord from "../assets/social/discord.png";
import symbol from "../assets/symbol.png";
import ChildComponent1 from "../components/child1";
import ChildComponent2 from "../components/child2";
import ChildComponent3 from "../components/child3";
import whaleImage1 from "../assets/whale/whales_1.png";
import whaleImage2 from "../assets/whale/whales_2.png";
import whaleImage3 from "../assets/whale/whales_3.png";
import whaleImage4 from "../assets/whale/whales_4.png";

function Staking() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [usdtduration, setUsdtDuration] = useState("");
  const [btcduration, setBtcDuration] = useState("");
  const [ethduration, setEthDuration] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPercentage1, setSelectedPercentage1] = useState("25%");
  const [selectedPercentage2, setSelectedPercentage2] = useState("25%");
  const [selectedPercentage3, setSelectedPercentage3] = useState("25%");
  const [whaleImage1Src, setWhaleImage1Src] = useState(whaleImage1);
  const [whaleImage2Src, setWhaleImage2Src] = useState(whaleImage1);
  const [whaleImage3Src, setWhaleImage3Src] = useState(whaleImage1);

  const percentages = ["25%", "50%", "75%", "ALL IN"];

  const handleInputChange = (e, setter) => {
    const validValue = e.target.value.replace(/[^0-9.]/g, "");
    setter(validValue);
  };

  const handleSliderChange = (e, setSelectedPercentage, setWhaleImage) => {
    const value = Number(e.target.value);
    let selectedPercent;
    let whaleImageToShow;

    if (value <= 25) {
      selectedPercent = "25%";
      whaleImageToShow = whaleImage1;
    } else if (value <= 50) {
      selectedPercent = "50%";
      whaleImageToShow = whaleImage2;
    } else if (value <= 75) {
      selectedPercent = "75%";
      whaleImageToShow = whaleImage3;
    } else {
      selectedPercent = "ALL IN";
      whaleImageToShow = whaleImage4;
    }

    setSelectedPercentage(selectedPercent);
    setWhaleImage(whaleImageToShow);
  };

  const handleClickPercentage = (percentage, setSelectedPercentage, setWhaleImage) => {
    setSelectedPercentage(percentage);

    switch (percentage) {
      case "25%":
        setWhaleImage(whaleImage1);
        break;
      case "50%":
        setWhaleImage(whaleImage2);
        break;
      case "75%":
        setWhaleImage(whaleImage3);
        break;
      case "ALL IN":
        setWhaleImage(whaleImage4);
        break;
      default:
        break;
    }
  };

  const handleWalletStatus = (isConnected) => {
    if (isConnected) {
      alert("Wallet Connected");
    } else {
      alert("Wallet Disconnected");
    }
  };

  useEffect(() => {
    // Handle wallet connection status on load
    const walletConnected = true; // Replace with actual connection check
    handleWalletStatus(walletConnected);

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <div className="flex flex-col w-full items-center text-white">
      {/* Banner Section */}
      <div className="flex h-screen w-full items-center text-[40px] my-[20px] md:my-0 md:text-[80px] relative justify-center">
        <img src={banner} alt="Whale" className="absolute w-full h-[100%] my-[20px] md:h-[auto]" />
        <div className="relative z-10 flex flex-col justify-center items-start w-full h-full px-4 mb-[-40px]">
          <h1 className="font-bold">{t("swim")}</h1>
          <h1 className="font-bold">{t("earn")}</h1>
          <p className="mt-4 text-[15px] md:text-[25px]">{t("Join")}</p>
        </div>
      </div>

      {/* USDT Staking Section */}
      <div className="flex flex-wrap w-full relative mt-10">
        <img src={usdtbackground} className="absolute w-full h-full" alt="" />
        <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
          <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10 ">
            <div className="flex items-center">
              <img src={usdt} alt="" className="w-14 h-14 mr-4" />
              <p className="text-[35px] md:text-[30px] font-bold flex">USDT</p>
            </div>
            <div className="flex mt-5 w-full justify-between text-white">
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setUsdtDuration("30 Days")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  30 Days
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">15%</p>
              </div>
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setUsdtDuration("6 Months")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  6 Months
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">24%</p>
              </div>
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setUsdtDuration("1 Year")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  1 Year
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">36%</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
            <div className="flex justify-between">
              <p className="text-[25px] md">{t("stake")}</p>
              <input
                type="text"
                className="text-black outline-none rounded text-right p-2"
                value={inputValue1}
                onChange={(e) => handleInputChange(e, setInputValue1)}
              />
            </div>
            <div>
              <p className="text-[25px] md">{usdtduration ? usdtduration : "0 Days"}</p>
              <p></p>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={
                  selectedPercentage1 === "25%"
                    ? 25
                    : selectedPercentage1 === "50%"
                    ? 50
                    : selectedPercentage1 === "75%"
                    ? 75
                    : 100
                }
                onChange={(e) => handleSliderChange(e, setSelectedPercentage1, setWhaleImage1Src)}
                className="slider"
              />
              <img src={whaleImage1Src} alt="Whale" className="whale-slider-image" />
              <div className="flex justify-around mt-2">
                {percentages.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleClickPercentage(percentage, setSelectedPercentage1, setWhaleImage1Src)}
                    className={`rounded-full p-2 ${
                      selectedPercentage1 === percentage ? "bg-blue-500" : "bg-white text-black"
                    }`}
                  >
                    {percentage}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BTC Staking Section */}
      <div className="flex flex-wrap w-full relative mt-10">
        <img src={btcbg} className="absolute w-full h-full" alt="" />
        <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
          <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10 ">
            <div className="flex items-center">
              <img src={btc} alt="" className="w-14 h-14 mr-4" />
              <p className="text-[35px] md:text-[30px] font-bold flex">Bitcoin</p>
            </div>
            <div className="flex mt-5 w-full justify-between text-white">
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setBtcDuration("30 Days")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  30 Days
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">15%</p>
              </div>
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setBtcDuration("6 Months")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  6 Months
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">24%</p>
              </div>
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setBtcDuration("1 Year")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  1 Year
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">36%</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
            <div className="flex justify-between">
              <p className="text-[25px] md">{t("stake")}</p>
              <input
                type="text"
                className="text-black outline-none rounded text-right p-2"
                value={inputValue2}
                onChange={(e) => handleInputChange(e, setInputValue2)}
              />
            </div>
            <div>
              <p className="text-[25px] md">{btcduration ? btcduration : "0 Days"}</p>
              <p></p>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={
                  selectedPercentage2 === "25%"
                    ? 25
                    : selectedPercentage2 === "50%"
                    ? 50
                    : selectedPercentage2 === "75%"
                    ? 75
                    : 100
                }
                onChange={(e) => handleSliderChange(e, setSelectedPercentage2, setWhaleImage2Src)}
                className="slider"
              />
              <img src={whaleImage2Src} alt="Whale" className="whale-slider-image" />
              <div className="flex justify-around mt-2">
                {percentages.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleClickPercentage(percentage, setSelectedPercentage2, setWhaleImage2Src)}
                    className={`rounded-full p-2 ${
                      selectedPercentage2 === percentage ? "bg-blue-500" : "bg-white text-black"
                    }`}
                  >
                    {percentage}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ETH Staking Section */}
      <div className="flex flex-wrap w-full relative mt-10">
        <img src={ethbg} className="absolute w-full h-full" alt="" />
        <div className="p-2 flex flex-wrap w-full relative z-10 md:p-0 md:justify-between">
          <div className="my-auto pt-5 md:pt-0 ml-2 w-full md:w-[35%] lg:ml-10 ">
            <div className="flex items-center">
              <img src={eth} alt="" className="w-14 h-14 mr-4" />
              <p className="text-[35px] md:text-[30px] font-bold flex">Ethereum</p>
            </div>
            <div className="flex mt-5 w-full justify-between text-white">
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setEthDuration("30 Days")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  30 Days
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">15%</p>
              </div>
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setEthDuration("6 Months")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  6 Months
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">24%</p>
              </div>
              <div
                className="rounded-3xl border-gray-300 border w-[31%] h-auto text-center cursor-pointer"
                onClick={() => setEthDuration("1 Year")}
              >
                <div className="bg-white text-black text-[15px] md:text-[17px] py-2 rounded-3xl md:rounded-full">
                  1 Year
                </div>
                <p className=" text-[20px] md:text-[30px] my-auto hover:opacity-40 active:opacity-50">36%</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[30%] lg:pl-10 pt-16 pb-5">
            <div className="flex justify-between">
              <p className="text-[25px] md">{t("stake")}</p>
              <input
                type="text"
                className="text-black outline-none rounded text-right p-2"
                value={inputValue3}
                onChange={(e) => handleInputChange(e, setInputValue3)}
              />
            </div>
            <div>
              <p className="text-[25px] md">{ethduration ? ethduration : "0 Days"}</p>
              <p></p>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={
                  selectedPercentage3 === "25%"
                    ? 25
                    : selectedPercentage3 === "50%"
                    ? 50
                    : selectedPercentage3 === "75%"
                    ? 75
                    : 100
                }
                onChange={(e) => handleSliderChange(e, setSelectedPercentage3, setWhaleImage3Src)}
                className="slider"
              />
              <img src={whaleImage3Src} alt="Whale" className="whale-slider-image" />
              <div className="flex justify-around mt-2">
                {percentages.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleClickPercentage(percentage, setSelectedPercentage3, setWhaleImage3Src)}
                    className={`rounded-full p-2 ${
                      selectedPercentage3 === percentage ? "bg-blue-500" : "bg-white text-black"
                    }`}
                  >
                    {percentage}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Whale Footer */}
      <div className="flex flex-col my-10 w-full h-auto bg-black">
        <img src={bg_whale} className="w-full h-auto " alt="" />
        <p className="lg:pl-20 pl-10 mt-[-90px] lg:mt-[-200px] text-[18px] md:text-[40px] font-bold lg:text-[51px]">
          {t("crypto")}
        </p>
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
