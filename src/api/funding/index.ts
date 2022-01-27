import axios from "services/axios";
import Web3 from "web3";

// TODO: remove TypeScript's any.
declare const window: any;

// Initiate web3.
let web3: any;
if (typeof window.web3 !== undefined) {
  web3 = new Web3(window.ethereum);
} else {
  web3 = new Web3("https://mainnet.infura.io/v3/f811f2257c4a4cceba5ab9044a1f03d2");
}

export const getEthBalance = async (address: string) => {
  return await web3.eth.getBalance(address, (_: any, balance: any) => {
    return web3.utils.fromWei(balance);
  });
};
