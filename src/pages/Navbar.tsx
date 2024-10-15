import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../constants";
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';

import '../index.css';

import '../custom.css';


function Navbar() {
    const { t, i18n } = useTranslation();

    // Dynamically assign the font class based on the language
    const fontClass = i18n.language === 'en' ? 'font-cubic' : 'font-cubic';
    const [isOpen, setIsOpen] = useState(false);

    // Initialize state for selected language label and image
    const [selectedLanguage, setSelectedLanguage] = useState({
        label: t('English'),  // Default language label
        img: '/src/assets/language/en.svg'  // Default image path
    });

    // Set the correct language and flag on component mount
    useEffect(() => {
        const currentLang = i18n.language || 'en';
        const selectedLang = LANGUAGES.find(({ code }) => code === currentLang);

        if (selectedLang) {
            setSelectedLanguage({
                label: selectedLang.label,
                img: selectedLang.lang, // Path to the correct flag
            });
        }
    }, [i18n.language]);

    const onChangeLang = (code: string, label: string, img: string) => {
        i18n.changeLanguage(code);
        setSelectedLanguage({ label, img });  // Update the label and image
        setIsOpen(false);
    }

    return (

        <div className="navbar flex w-full items-center justify-between">

            {/* Left side with Logo */}
            <div className="navbar-logo flex items-center">
                <a href="https://staking.whalestrategy.net/">
                    <img src="/logo.png" className="w-16 h-16 sm:ml-10" alt="Logo" />
                </a>
            </div>

            {/* Right side with Connect Wallet and Language Selector */}
            <div className="navbar-buttons flex items-center">
                <WalletActionButton className="wallet-button" />
        
                <div className="relative">
                    <button onClick={() => setIsOpen(!isOpen)} className="language-button">
                        {selectedLanguage.img && (
                            <img src={selectedLanguage.img} alt="" className="w-6 h-auto" />
                        )}
                        {t(selectedLanguage.label)}
                    </button>
                    {isOpen && (
                        <div className="language-dropdown">
                            {LANGUAGES.map(({ code, label, lang }) => (
                                <div key={code} className="language-dropdown-item" onClick={() => onChangeLang(code, label, lang)}>
                                    <img src={lang} alt="" className="w-6 h-auto" />
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