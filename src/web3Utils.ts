import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import StakingContractABI from './StakingContract.json'; // ABI of your smart contract

declare global {
    interface Window {
        ethereum?: any;
    }
}

let web3: Web3 | null = null;
let stakingContract: any = null; // Initialize stakingContract as null initially

// Check if MetaMask or any provider is available and properly initialize web3
if (window.ethereum) {
    try {
        web3 = new Web3(window.ethereum);
        window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Staking contract address - Load from .env file
        const stakingContractAddress = process.env.REACT_APP_STAKING_CONTRACT_ADDRESS || '';

        if (stakingContractAddress) {
            stakingContract = new web3.eth.Contract(StakingContractABI as AbiItem[], stakingContractAddress);
        } else {
            console.error("Staking contract address is not defined in .env");
        }

    } catch (error) {
        console.error("Error while connecting to MetaMask", error);
    }
} else {
    console.log('Please install MetaMask');
}

// Utility functions to safely return web3 and stakingContract
export const getStakingContract = () => {
    if (!stakingContract) {
        console.error('Staking contract is not initialized');
        return null;
    }
    return stakingContract;
};

export const getWeb3 = () => {
    if (!web3) {
        console.error('Web3 instance is not initialized');
        return null;
    }
    return web3;
};
