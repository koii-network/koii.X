import { useQuery } from "react-query";
import axios from "services/axios";

interface Props {
  timeframe: string;
}

const fetchNfts = async (timeframe: string = "1w") => {
  try {
    const { data } = await axios.get(`/attention/nft-summaries?period=${timeframe}`);
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useNfts({ timeframe = "1w" }: Props) {
  return useQuery(`nfts-${timeframe}`, () => fetchNfts(timeframe), {
    staleTime: 60 * 1000 * 5, // 5min cache
    // TODO: put it back to 5min cache
    refetchOnWindowFocus: undefined
  });
}
