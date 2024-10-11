import React, { useMemo, useState, useEffect } from 'react';
import Web3 from 'web3';
import type { Adapter, WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletDisconnectedError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import {
    WalletModalProvider,
} from '@tronweb3/tronwallet-adapter-react-ui';
import toast from 'react-hot-toast';
import { TronLinkAdapter, TokenPocketAdapter, BitKeepAdapter, OkxWalletAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';

import Navbar from './pages/Navbar';
import Staking from './pages/Staking';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
    // MetaMask state management
    const [metaMaskConnected, setMetaMaskConnected] = useState(false);
    const [account, setAccount] = useState('');
    const [isTronWalletConnected, setIsTronWalletConnected] = useState(false);

    // MetaMask connect/disconnect functions
    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setMetaMaskConnected(true);
                setIsTronWalletConnected(false); // Disconnect Tron wallet
            } catch (error) {
                console.error('User rejected the connection');
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const disconnectMetaMask = () => {
        setMetaMaskConnected(false);
        setAccount('');
    };

    // Tron Wallet connect/disconnect logic
    function onError(e: WalletError) {
        if (e instanceof WalletNotFoundError) {
            toast.error(e.message);
        } else if (e instanceof WalletDisconnectedError) {
            toast.error(e.message);
        } else {
            toast.error(e.message);
        }
    }

    const adapters = useMemo(() => {
        const tronLink = new TronLinkAdapter();
        const walletConnect = new WalletConnectAdapter({
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
        });
        const ledger = new LedgerAdapter({ accountNumber: 2 });
        const tokenPocket = new TokenPocketAdapter();
        const bitKeep = new BitKeepAdapter();
        const okxWallet = new OkxWalletAdapter();

        return [tronLink, walletConnect, ledger, tokenPocket, bitKeep, okxWallet];
    }, []);

    function onConnect() {
        setIsTronWalletConnected(true);
        setMetaMaskConnected(false); // Disconnect MetaMask
    }

    function onDisconnect() {
        setIsTronWalletConnected(false);
    }

    return (
        <WalletProvider onError={onError} onConnect={onConnect} autoConnect={true} adapters={adapters}>
            <WalletModalProvider>
                <div className="flex items-center flex-col bg-[#000000] text-stone-900 dark:text-stone-300 min-h-screen font-inter">
                    <Navbar
                        connectMetaMask={connectMetaMask}
                        metaMaskConnected={metaMaskConnected}
                        disconnectMetaMask={disconnectMetaMask}
                        account={account}
                        isTronWalletConnected={isTronWalletConnected}
                    />
                    <div className="px-4 w-full lg:w-3/4">
                        <Staking />
                    </div>
                </div>
            </WalletModalProvider>
        </WalletProvider>
    );
}

export default App;
