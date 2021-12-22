import { useQuery } from "react-query";
import axios from "services/axios";

interface Props {
  timeframe: string;
}

const fetchNfts = async (timeframe: string = "1w") => {
  try {
    const { data } = await axios.get(`/attention/nft-summaries?period=${timeframe}`);
    // TODO: remove this limit in favor of pagination.
    return data?.slice?.(0, 12);
  } catch (error) {
    return undefined;
  }
};

export function useNfts({ timeframe = "1w" }: Props) {
  return useQuery(`nfts-${timeframe}`, () => fetchNfts(timeframe), {
    staleTime: 60 * 1000 * 60, // 5min cache
    // TODO: put it back to 5min cache
    refetchOnWindowFocus: undefined
  });
}
