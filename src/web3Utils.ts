import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import StakingContractABI from './StakingContract.json'; // ABI of your smart contract

declare global {
    interface Window {
        ethereum?: any;
    }
}



let web3: Web3 | null = null;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' });
} else {
    console.log('Please install MetaMask');
}

// Staking contract address - Load from .env file
const stakingContractAddress = process.env.REACT_APP_STAKING_CONTRACT_ADDRESS || '';
const stakingContract = new web3.eth.Contract(StakingContractABI as AbiItem[], stakingContractAddress);

export const getStakingContract = () => stakingContract;
export const getWeb3 = () => web3;
