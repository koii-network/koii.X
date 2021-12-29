import { useQuery } from "react-query";
// sdk
import * as kweb from "@_koi/sdk/web";
let koiSDK = new kweb.Web();

// utils
import { formatDigitNumber, getNftsStats } from "services/utils";

interface Props {
  id: string;
}

const fetchArtist = async (id: string) => {
  try {
    if (!id) return undefined;
    const nfts = await koiSDK.getNftsByOwner(id);
    const [totalAttention, totalReward] = getNftsStats(nfts);
    const data: { nfts: any[]; totalAttention: string; totalReward: string | number } = { nfts, totalAttention, totalReward: formatDigitNumber(totalReward) };
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useArtist({ id }: Props) {
  return useQuery(`artist-${id}`, () => fetchArtist(id), {
    staleTime: 60 * 1000 * 5, // 5min cache.
    refetchOnWindowFocus: undefined
  });
}
