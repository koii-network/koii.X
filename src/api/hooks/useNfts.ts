import { useQuery } from "react-query";
import { useQueryParam } from "use-query-params";
// services
import axios from "services/axios";
// api
import { fetchNsfwList } from "api";

interface Props {
  timeframe: string;
}

const fetchNfts = async (timeframe: string = "1w") => {
  try {
    let nsfwList: any[] = [];
    /* Get nsfw list */
    await fetchNsfwList()
      .then(res => {
        nsfwList = res?.data?.NSFWList || [];
      })
      .catch(() => {}); // We don't want to catch anything.

    /* Get nfts based on the timeframe */
    const { data } = await axios.get(`/attention/nft-summaries?period=${timeframe}`);
    const dataWithNsfwTag = data?.map((nft: any) => ({ ...nft, isNsfw: [...nsfwList].includes(nft?.id) }));

    return dataWithNsfwTag;
  } catch (error) {
    return undefined;
  }
};

export function useNfts({ timeframe = "1w" }: Props) {
  const [isNsfw] = useQueryParam("nsfw");
  return useQuery(`nfts-${timeframe}`, () => fetchNfts(timeframe), {
    staleTime: 60 * 1000 * 5, // 5min cache
    refetchOnWindowFocus: undefined,
    select: data => {
      return isNsfw ? data : [...data].filter((nft: any) => !nft.isNsfw);
    }
  });
}
