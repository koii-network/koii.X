import { useQuery } from "react-query";
import axios from "services/axios";

const fetchNsfw = async () => {
  try {
    const { data } = await axios.get(`/getNSFWList`, {
      baseURL: process.env.REACT_APP_API_URL
    });
    const nsfwList = data?.NSFWList || [];
    return nsfwList;
  } catch (error) {
    return undefined;
  }
};

export function useNsfw() {
  return useQuery(`nsfw-list`, fetchNsfw, {
    staleTime: 60 * 1000 * 60, // 1hr cache, since the nft details does not change.
    refetchOnWindowFocus: undefined
  });
}
