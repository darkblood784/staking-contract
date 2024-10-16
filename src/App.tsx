import React, { useEffect, useState } from 'react';
import { getWeb3, getStakingContract } from './web3Utils';
import Navbar from './pages/Navbar';
import Staking from './pages/Staking';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<any>(null);
    const [web3, setWeb3] = useState<any>(null);

    // Function to load the web3 and contract information
    const loadBlockchainData = async () => {
        const web3Instance = getWeb3();
        if (!web3Instance) {
            console.error("MetaMask is not connected or not installed");
            return;
        }

        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        const stakingContractInstance = getStakingContract();
        setContract(stakingContractInstance);
        setWeb3(web3Instance);
    };

    // Load blockchain data on component mount
    useEffect(() => {
        loadBlockchainData();
    }, []);

    return (
        <div className="flex items-center flex-col bg-[#000000] text-stone-900 dark:text-stone-300 min-h-screen font-inter">
            <Navbar />
            <div className="px-4 w-full lg:w-3/4">
                {account && contract ? (
                    <Staking account={account} contract={contract} web3={web3} />
                ) : (
                    <div>
                        <button onClick={loadBlockchainData}>Connect MetaMask</button>
                        <p>Please connect MetaMask to continue</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
