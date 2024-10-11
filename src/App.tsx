import React, { useMemo, useState, useEffect } from 'react';
import type { Adapter, WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import toast from 'react-hot-toast';
import { TronLinkAdapter, TokenPocketAdapter, BitKeepAdapter, OkxWalletAdapter } from '@tronweb3/tronwallet-adapters';
import { WalletConnectAdapter } from '@tronweb3/tronwallet-adapter-walletconnect';
import { LedgerAdapter } from '@tronweb3/tronwallet-adapter-ledger';
import Navbar from './pages/Navbar';
import Staking from './pages/Staking';
import 'bootstrap/dist/css/bootstrap.min.css';

// Manage MetaMask Connection
function useMetaMask() {
    const [account, setAccount] = useState<string | null>(null);

    // Connect to MetaMask
    const connectMetaMask = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                return accounts[0];
            } catch (error) {
                toast.error("MetaMask connection failed");
            }
        } else {
            toast.error("MetaMask not installed");
        }
    };

    // Disconnect MetaMask
    const disconnectMetaMask = () => {
        setAccount(null);
    };

    return { account, connectMetaMask, disconnectMetaMask };
}

export function App() {
    const { account, connectMetaMask, disconnectMetaMask } = useMetaMask();

    function onError(e: WalletError) {
        console.log(e);
        toast.error(e.message);
    }

    const adapters = useMemo(() => {
        const tronLink = new TronLinkAdapter();
        const walletConnect = new WalletConnectAdapter({ network: 'Nile' });
        const ledger = new LedgerAdapter({ accountNumber: 2 });
        const tokenPocket = new TokenPocketAdapter();
        const bitKeep = new BitKeepAdapter();
        const okxWallet = new OkxWalletAdapter();
        return [tronLink, walletConnect, ledger, tokenPocket, bitKeep, okxWallet];
    }, []);

    return (
        <WalletProvider onError={onError} adapters={adapters}>
            <WalletModalProvider>
                <div className="app flex items-center flex-col bg-black min-h-screen font-inter">
                    <Navbar 
                        connectMetaMask={connectMetaMask} 
                        disconnectMetaMask={disconnectMetaMask} 
                        account={account} 
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
