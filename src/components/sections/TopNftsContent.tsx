import { StringParam, withQueryParams } from "use-query-params";
// api
import { useNfts } from "hooks/api";
// ui
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { NftFeaturedCard } from "components/cards";

const TopNftsContent = ({ query }: any) => {
  // url queries
  const { t: timeframe } = query;
  /* Get nfts based on the timeframe */
  const { data: nfts, isLoading } = useNfts({ timeframe });

  return (
    <>
      {isLoading && (
        <Center w="100%" minH="300px">
          <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />
        </Center>
      )}
      {!isLoading && (
        <SimpleGrid w="100%" minW="0" minH="0" gap="8" columns={[1, 2, 4]}>
          {nfts?.map((nft: Record<string, any>) => (
            <NftFeaturedCard nft={nft} key={nft?.id} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default withQueryParams(
  {
    t: StringParam
  },
  TopNftsContent
);
