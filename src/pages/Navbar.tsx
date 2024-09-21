import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants";
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';

function Navbar() {
    const { i18n, t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);  // State for wallet connection

    // Initialize state for selected language label and image
    const [selectedLanguage, setSelectedLanguage] = useState({
        label: t('English'),  // Default language label
        img: ''  // Default image path
    });

    // Function to handle language change
    const onChangeLang = (code: string, label: string, img: string) => {
        i18n.changeLanguage(code);
        setSelectedLanguage({ label, img });  // Update the label and image
        setIsOpen(false);
    };

    // Wallet connection status logic (can be modified to detect actual wallet status)
    const handleWalletConnect = () => {
        setIsWalletConnected(!isWalletConnected);  // Toggle wallet connection status
    };

    return (
        <div className="px-2 flex w-full items-center justify-between fixed z-40 top-0 left-0 h-28 md:pr-8 font dark:bg-[rgba(255,255,255,0)] backdrop-blur-[30px] shadow-[0_3px_6px_3px_rgba(0,0,0,0.4)] transition-all duration-300">
            {/* Logo */}
            <a href="https://staking.whalestrategy.net/">
                <img src="/logo.png" className="w-16 h-16" alt="Logo" />
            </a>

            {/* Right side of the Navbar: Wallet Connect & Language Selector */}
            <div className="flex items-center">
                {/* Wallet Connection Button */}
                <div className="relative">
                    <WalletActionButton className='wallet-action-button' onClick={handleWalletConnect} />
                    {!isWalletConnected ? (
                        <span className="wallet-status not-connected">Not Connected</span>
                    ) : (
                        <span className="wallet-status connected">Connected</span>
                    )}
                </div>

                {/* Language Selector */}
                <div className="relative language-btn">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-center w-24 md:w-32 h-12 hover:bg-[#373c47] rounded-[4px] p-2 bg-[#0f111a] text-white text-[16px] font-bold ml-4 navbar-button"
                    >
                        {selectedLanguage.img && (
                            <img src={selectedLanguage.img} alt="Language" className="w-6 h-auto mr-2" />
                        )}
                        {t(selectedLanguage.label)}
                    </button>
                    
                    {/* Language Dropdown */}
                    {isOpen && (
                        <div className="language-dropdown absolute ml-4 top-full mt-1 w-24 md:w-32">
                            {LANGUAGES.map(({ code, label, lang }) => (
                                <div key={code}
                                    className="language-dropdown-item"
                                    onClick={() => onChangeLang(code, label, lang)}
                                >
                                    <img src={lang} alt={label} className="w-6 h-auto" />
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
