import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';
import '../index.css';
import '../custom.css';

interface NavbarProps {
    connectMetaMask: () => Promise<void>;
    disconnectMetaMask: () => void;
    account: string | null;
}

function Navbar({ connectMetaMask, disconnectMetaMask, account }: NavbarProps) {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    // Language handling
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
        <div className="px-2 flex w-full items-center justify-between fixed z-40 top-0 left-0 h-28 md:pr-8 dark:bg-[rgba(255,255,255,0)] backdrop-blur-[30px] shadow-[0_3px_6px_3px_rgba(0,0,0,0.4)] transition-all duration-300 font-cubic">
            {/* Left side: Logo */}
            <div className="flex items-center">
                <a href="https://staking.whalestrategy.net/">
                    <img src="/logo.png" className="w-16 h-16 sm:ml-10" alt="Logo" />
                </a>
            </div>

            {/* Right side: Wallet + Language */}
            <div className="flex items-center">
                {account ? (
                    <button onClick={disconnectMetaMask} className="bg-red-500 text-white p-2 rounded">
                        Disconnect {account.slice(0, 6)}...{account.slice(-4)}
                    </button>
                ) : (
                    <button onClick={connectMetaMask} className="bg-blue-500 text-white p-2 rounded">
                        Connect MetaMask
                    </button>
                )}
                
                <WalletActionButton className="ml-4 w-28 md:w-32 bg-[#5170fd] text-white" />

                <div className="relative">
                    <button onClick={() => setIsOpen(!isOpen)} className="ml-4 flex items-center bg-[#5170fd] text-white p-2 rounded">
                        {selectedLanguage.img && <img src={selectedLanguage.img} alt="" className="w-6 h-auto mr-2" />}
                        {t(selectedLanguage.label)}
                    </button>
                    {isOpen && (
                        <div className="absolute ml-4 top-full mt-1 w-24 md:w-32 bg-[#2c2d30] text-white shadow-lg">
                            {LANGUAGES.map(({ code, label, lang }) => (
                                <div key={code} className="cursor-pointer p-2 hover:bg-blue-100" onClick={() => onChangeLang(code, label, lang)}>
                                    <img src={lang} alt="" className="w-6 h-auto mr-2" />
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
