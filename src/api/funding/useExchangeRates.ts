import { useQuery } from "react-query";
import axios from "axios";

const fetchExchangeRates = async () => {
  try {
    const { data } = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`);
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useExchangeRates() {
  return useQuery(`exchange-rates`, fetchExchangeRates, {
    staleTime: 60 * 1000 * 60, // 1hr cache
    refetchOnWindowFocus: undefined
  });
}
