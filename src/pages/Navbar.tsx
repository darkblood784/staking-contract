// Navbar.tsx

import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import '../index.css';
import '../custom.css';

// Define props for Navbar
interface NavbarProps {
    connectMetaMask: () => Promise<void>;
    disconnectMetaMask: () => void;
    account: string | null;
}

function Navbar({ connectMetaMask, disconnectMetaMask, account }: NavbarProps) {
    const { t, i18n } = useTranslation();

    const fontClass = i18n.language === 'en' ? 'font-cubic' : 'font-cubic';
    const [isOpen, setIsOpen] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState({
        label: t('English'),  
        img: '/src/assets/language/en.svg'  
    });

    useEffect(() => {
        const currentLang = i18n.language || 'en';
        const selectedLang = LANGUAGES.find(({ code }) => code === currentLang);

        if (selectedLang) {
            setSelectedLanguage({
                label: selectedLang.label,
                img: selectedLang.lang,
            });
        }
    }, [i18n.language]);

    const onChangeLang = (code: string, label: string, img: string) => {
        i18n.changeLanguage(code);
        setSelectedLanguage({ label, img });
        setIsOpen(false);
    };

    return (
        <div className={`px-2 flex w-full items-center justify-between fixed z-40 top-0 left-0 h-28 md:pr-8 dark:bg-[rgba(255,255,255,0)] backdrop-blur-[30px] shadow-[0_3px_6px_3px_rgba(0,0,0,0.4)] transition-all duration-300 ${fontClass}`}>
            <div className="flex items-center">
                <a href="https://staking.whalestrategy.net/">
                    <img src="/logo.png" className="w-16 h-16 sm:ml-10" alt="Logo" />
                </a>
            </div>

            <div className="flex items-center">
                <WalletActionButton className={`w-28 md:w-32 flex justify-center bg-[#5170fd] text-white text-[16px] font-bold hover:scale-105 transition-transform duration-300 ${fontClass}`} />
                
                {account ? (
                    <button
                        onClick={disconnectMetaMask}
                        className="w-28 md:w-32 bg-red-500 text-white rounded"
                    >
                        Disconnect: {account.slice(0, 6)}...{account.slice(-4)}
                    </button>
                ) : (
                    <button
                        onClick={connectMetaMask}
                        className="w-28 md:w-32 bg-green-500 text-white rounded"
                    >
                        Connect MetaMask
                    </button>
                )}

                <div className="relative">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-24 md:w-32 h-12 rounded-[4px] p-2 bg-[#5170fd] text-white text-[16px] font-bold ml-4 hover:scale-105 transition-transform duration-300 ">
                        {selectedLanguage.img && (
                            <img src={selectedLanguage.img} alt="" className="w-6 h-auto mr-2 mt-[4px]" />
                        )}
                        {t(selectedLanguage.label)}
                    </button>
                    {isOpen && (
                        <div className="absolute ml-4 top-full mt-1 w-24 md:w-32 bg-[#2c2d30] text-white shadow-lg">
                            {LANGUAGES.map(({ code, label, lang }) => (
                                <div key={code} className="flex items-center justify-center cursor-pointer p-2 hover:bg-blue-100" onClick={() => onChangeLang(code, label, lang)}>
                                    <img src={lang} alt="" className="w-6 h-auto mr-2 mt-[4px]" />
                                    <span>{t(label)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
