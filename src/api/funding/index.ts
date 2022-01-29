import axios from "services/axios";
import Web3 from "web3";

// TODO: remove TypeScript's any.
declare const window: any;

// Initiate web3.
let web3: any;
if (typeof window.web3 !== undefined) {
  web3 = new Web3(window.ethereum);
} else {
  web3 = new Web3(process.env.REACT_APP_INFURA_URL || null);
}

export const getEthBalance = async (address: string) => {
  return await web3.eth.getBalance(address, (_: any, balance: any) => {
    return web3.utils.fromWei(balance);
  });
};

export const sendEth = async ({ from, to, amount }: { from?: string; to: string; amount?: number }) => {
  return await web3.eth.sendTransaction({ from, to, value: web3.utils.toWei(String(amount), "ether") });
};
