// import axios from "service/axios";
// import { default as Axios } from "axios";
// import Web3 from "web3";

// sdk
import * as kweb from "@_koi/sdk/web";
let koiSDK = new kweb.Web();

declare global {
  interface Window {
    koiiWallet?: any;
  }
}

/**
 *
 * @param {Function} fn Function to poll for result
 * @param {Number} timeout How long to poll for
 * @param {Number} interval Polling interval
 * @returns {Promise}
 */
export const poll = (fn: any, timeout: any, interval: any) => {
  var endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  var checkCondition = function (resolve: any, reject: any) {
    // If the condition is met, we're done!
    var result = fn();
    if (result) {
      resolve(result);
    }
    // If the condition isn't met but the timeout hasn't elapsed, go again
    else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject);
    }
    // Didn't match and too much time, reject!
    else {
      reject(new Error("timed out for " + fn + ": " + arguments));
    }
  };

  return new Promise(checkCondition);
};

export const initExtension = async () => {
  try {
    // Does it exist?
    let extensionObj: any = await poll(() => window.koiiWallet, 1000, 200);
    // Is it connected?
    let res = await extensionObj.getPermissions();

    if (res.status === 200 && res.data.length) return true;
    else return false;
  } catch (error) {
    // Have to throw error to trigger rejected
    throw new Error("Extension does not exist");
  }
};

export const connectToExtension = async () => {
  try {
    const extension = window.koiiWallet;
    let res = await extension.connect();
    if (res.status === 200) return true;

    throw new Error(res?.data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAddress = async () => {
  const extension = window.koiiWallet;
  try {
    let res = await extension.getAddress();
    if (res) return res;
    else throw new Error(res.data);
  } catch (error: any) {
    // If we get here it's most likey user uninstalled extension and re-installed
    // Very edgy edge-case, but better to handle than not
    extension?.disconnect();
    throw new Error(error);
  }
};

export const getBalances = async (walletAddress: any) => {
  let koi: any;
  let ar: any;
  try {
    await koiSDK.setWallet(walletAddress);
    koi = await koiSDK.getKoiBalance();
    ar = await koiSDK.getWalletBalance();
    return { koi, ar };
  } catch (error) {}
};
