export const connectToMetaMask = async () => {
  // await sleep(1000);
  if (typeof window.ethereum !== "undefined") {
    /* MetaMask is installed */
    let ethAddress = null;
    await window.ethereum.request({ method: "eth_requestAccounts" }).then(async (ethAddrArr: string) => {
      if (!ethAddrArr || !ethAddrArr[0]) {
        throw new Error("no_accounts");
      }
      ethAddress = ethAddrArr[0];
    });
    return { ethAddress };
  } else {
    /* MetaMask is not installed */
    throw new Error("extension_not_installed");
  }
};
