import { useQuery } from "react-query";
import axios from "services/axios";

interface Props {
  id: string;
}

const fetchNft = async (id: string) => {
  try {
    if (!id) return undefined;
    const { data } = await axios.get(`/attention/nft?id=${id}`);
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useNft({ id }: Props) {
  return useQuery(`nft-${id}`, () => fetchNft(id), {
    staleTime: 60 * 1000 * 60, // 1hr cache, since the nft details does not change.
    refetchOnWindowFocus: undefined
  });
}
