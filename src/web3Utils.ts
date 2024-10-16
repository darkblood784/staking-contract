import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import StakingContractABI from './StakingContract.json'; // ABI of your smart contract

declare global {
    interface Window {
        ethereum?: any;
    }
}

let web3: Web3 | null = null;

// Check if MetaMask is installed and initialize Web3
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' }).catch((error: any) => {
        console.error("User denied account access or an error occurred:", error);
    });
} else {
    console.log('MetaMask is not installed.');
    alert('MetaMask is required to use this app. Please install MetaMask.');
}

// Load environment variables
const stakingContractAddress = process.env.REACT_APP_STAKING_CONTRACT_ADDRESS;
const usdtAddress = process.env.REACT_APP_USDT_ADDRESS;
const btcAddress = process.env.REACT_APP_BTC_ADDRESS;
const ethAddress = process.env.REACT_APP_ETH_ADDRESS;

const stakingContract = web3 ? new web3.eth.Contract(StakingContractABI as AbiItem[], stakingContractAddress) : null;

export const getStakingContract = () => stakingContract;
export const getWeb3 = () => web3;
