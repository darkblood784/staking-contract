// App.tsx

import React, { useMemo, useState } from 'react';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import toast from 'react-hot-toast';
import { TronLinkAdapter, WalletConnectAdapter, LedgerAdapter, TokenPocketAdapter, BitKeepAdapter, OkxWalletAdapter } from '@tronweb3/tronwallet-adapters';
import Navbar from './pages/Navbar';
import Staking from './pages/Staking';
import 'bootstrap/dist/css/bootstrap.min.css';
import detectEthereumProvider from '@metamask/detect-provider';

declare global {
  interface Window {
    ethereum: any;
  }
}

export function App() {
    const [account, setAccount] = useState<string | null>(null);

    async function connectMetaMask() {
        const provider = await detectEthereumProvider();
        if (provider) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('Please install MetaMask');
        }
    }

    function disconnectMetaMask() {
        setAccount(null);
    }

    function onError(e: any) {
        console.log(e);
        toast.error(e.message);
    }

    const adapters = useMemo(function () {
        const tronLink1 = new TronLinkAdapter();
        const walletConnect1 = new WalletConnectAdapter({
            network: 'Nile',
            options: {
                relayUrl: 'wss://relay.walletconnect.com',
                projectId: 'your-project-id',
                metadata: {
                    name: 'Test DApp',
                    description: 'JustLend WalletConnect',
                    url: 'https://your-dapp-url.org/',
                    icons: ['https://your-dapp-url.org/mainLogo.svg'],
                },
            },
        });
        const ledger = new LedgerAdapter({
            accountNumber: 2,
        });
        const tokenPocket = new TokenPocketAdapter();
        const bitKeep = new BitKeepAdapter();
        const okxWalletAdapter = new OkxWalletAdapter();
        return [tronLink1, walletConnect1, ledger, tokenPocket, bitKeep, okxWalletAdapter];
    }, []);

    return (
        <WalletProvider onError={onError} adapters={adapters}>
            <WalletModalProvider>
                <div className="flex items-center flex-col bg-[#000000] text-stone-900 dark:text-stone-300 min-h-screen font-inter">
                    <Navbar 
                        connectMetaMask={connectMetaMask} 
                        disconnectMetaMask={disconnectMetaMask} 
                        account={account} 
                    />
                    <div className="px-4 w-full lg:w-3/4 ">
                        <Staking />
                    </div>
                </div>
            </WalletModalProvider>
        </WalletProvider>
    );
}

export default App;
