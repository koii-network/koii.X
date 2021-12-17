import React from "react";
// context
import { useFinnie } from "components/context/finnie";
// services
import { getNftsStats } from "services/utils";
// sdk
import * as kweb from "@_koi/sdk/web";
let koiSDK = new kweb.Web();

export default function useSdk() {
  const [{ wallet, status, error }, setState] = React.useState({ status: "idle", error: null });
  /* useFinnie to connect to finnie */
  const {
    state: { connectFinnie }
  } = useFinnie();

  const getKoiiNfts = async () => {
    setState(prevState => ({ ...prevState, status: "loading", error: null }));
    try {
      const walletAddress = await connectFinnie();
      const nfts = await koiSDK.getNftsByOwner(walletAddress);
      const [totalAttention, totalReward] = getNftsStats(nfts);

      setState(prevState => ({ ...prevState, status: "success", wallet: { nfts, totalAttention, totalReward }, error: null }));
    } catch (error) {
      setState(prevState => ({ ...prevState, status: "error", error }));
    }
  };
  return { wallet, status, error, getKoiiNfts };
}
