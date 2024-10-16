import React, { useMemo, useState, useEffect } from 'react';
import Web3 from 'web3';
import StakingContractABI from './StakingContract.json'; // Import ABI
import type { Adapter, WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletDisconnectedError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import toast from 'react-hot-toast';
import { TronLinkAdapter, TokenPocketAdapter, BitKeepAdapter, OkxWalletAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';

import Navbar from './pages/Navbar';
import Staking from './pages/Staking';
import 'bootstrap/dist/css/bootstrap.min.css';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || "YOUR_SMART_CONTRACT_ADDRESS"; // Load contract address from .env

export function App() {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [userStakeInfo, setUserStakeInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Function to initialize Web3 and the contract instance
    const initializeWeb3 = async () => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            try {
                // Request wallet connection
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWeb3(web3Instance);

                // Get the user's account
                const accounts = await web3Instance.eth.getAccounts();
                setAccount(accounts[0]);

                // Initialize the contract
                const contractInstance = new web3Instance.eth.Contract(StakingContractABI, contractAddress);
                setContract(contractInstance);

                console.log("Web3 and Contract Initialized.");
            } catch (error) {
                console.error("Error initializing Web3: ", error);
                toast.error("Failed to connect wallet.");
            }
        } else {
            toast.error("Please install MetaMask!");
        }
    };

    // Fetch the stake information for the connected account
    const fetchStakeInfo = async () => {
        if (contract && account) {
            try {
                const stakedInfoUSDT = await contract.methods.userStakeInfos(account, process.env.REACT_APP_USDT_ADDRESS).call();
                const stakedInfoBTC = await contract.methods.userStakeInfos(account, process.env.REACT_APP_BTC_ADDRESS).call();
                const stakedInfoETH = await contract.methods.userStakeInfos(account, process.env.REACT_APP_ETH_ADDRESS).call();
                setUserStakeInfo({ USDT: stakedInfoUSDT, BTC: stakedInfoBTC, ETH: stakedInfoETH });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stake info:", error);
            }
        }
    };

    useEffect(() => {
        initializeWeb3();
    }, []);

    useEffect(() => {
        if (contract && account) {
            fetchStakeInfo();
        }
    }, [contract, account]);

    function onError(e: WalletError) {
        console.log(e);
        if (e instanceof WalletNotFoundError) {
            toast.error(e.message);
        } else if (e instanceof WalletDisconnectedError) {
            toast.error(e.message);
        } else toast.error(e.message);
    }

    const adapters = useMemo(function () {
        const tronLink1 = new TronLinkAdapter();
        const walletConnect1 = new WalletConnectAdapter({
            network: 'Nile',
            options: {
                relayUrl: 'wss://relay.walletconnect.com',
                projectId: '5fc507d8fc7ae913fff0b8071c7df231',
                metadata: {
                    name: 'Test DApp',
                    description: 'JustLend WalletConnect',
                    url: 'https://your-dapp-url.org/',
                    icons: ['https://your-dapp-url.org/mainLogo.svg'],
                },
            },
            web3ModalConfig: {
                themeMode: 'dark',
                themeVariables: {
                    '--w3m-z-index': '1000'
                },
                enableExplorer: true,
            }
        });
        const ledger = new LedgerAdapter({ accountNumber: 2 });
        const tokenPocket = new TokenPocketAdapter();
        const bitKeep = new BitKeepAdapter();
        const okxWalletAdapter = new OkxWalletAdapter();
        return [tronLink1, walletConnect1, ledger, tokenPocket, bitKeep, okxWalletAdapter];
    }, []);

    function onConnect() {
        console.log('onConnect');
    }

    async function onAccountsChanged() {
        console.log('onAccountsChanged');
        fetchStakeInfo();
    }

    async function onAdapterChanged(adapter: Adapter | null) {
        console.log('onAdapterChanged', adapter);
    }

    return (
        <WalletProvider onError={onError} onConnect={onConnect} onAccountsChanged={onAccountsChanged} onAdapterChanged={onAdapterChanged} autoConnect={true} adapters={adapters} disableAutoConnectOnLoad={true}>
            <WalletModalProvider>
                <div className="flex items-center flex-col bg-[#000000] text-stone-900 dark:text-stone-300 min-h-screen font-inter">
                    <Navbar />
                    <div className="px-4 w-full lg:w-3/4">
                        {loading ? (
                            <p>Loading Staking Information...</p>
                        ) : (
                            <Staking
                                account={account}
                                userStakeInfo={userStakeInfo}
                                contract={contract}
                                web3={web3}
                            />
                        )}
                    </div>
                </div>
            </WalletModalProvider>
        </WalletProvider>
    );
}

export default App;
