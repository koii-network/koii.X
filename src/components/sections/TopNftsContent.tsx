import useInfiniteScroll from "react-infinite-scroll-hook";
import { useEffect, useState } from "react";
import { StringParam, withQueryParams } from "use-query-params";
// api
import { useNfts } from "hooks/api";
// ui
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { NftFeaturedCard } from "components/cards";
import { EmptyState } from "components/ui";

const TopNftsContent = ({ query }: any) => {
  /*  */
  const { t: timeframe } = query;
  /* Get nfts based on the timeframe */
  const { data: nfts, isLoading, isError } = useNfts({ timeframe });

  /* Pagination */
  const [nftsView, setNftsView] = useState(nfts);
  const [page, setPage] = useState(0);
  /* Get 12 more every scroll */
  useEffect(() => {
    setNftsView(nfts?.slice?.(0, page === 0 ? 12 : page * 12));
  }, [nfts, page]);
  /* Reset page index when changing timeframe */
  useEffect(() => {
    setPage(0);
  }, [timeframe]);

  const hasMore = nftsView?.length !== nfts?.length;

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: hasMore,
    onLoadMore: () => {
      setPage(page => page + 1);
    },
    disabled: isError,
    rootMargin: "0px 0px 0px 0px"
  });

  return (
    <>
      {isLoading && (
        <Center w="100%" minH={{ base: "300px", md: "600px" }}>
          <Spinner thickness="3px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />
        </Center>
      )}
      {/* Loading | Nfts */}
      {!isLoading && (
        <SimpleGrid w="100%" minW="0" minH="0" gap="8" columns={[1, 2, 4]}>
          {nftsView?.length !== 0 && nftsView?.map((nft: Record<string, any>) => <NftFeaturedCard nft={nft} key={nft?.id} />)}
        </SimpleGrid>
      )}
      {hasMore && <div ref={sentryRef} />}
      {/* No nfts to show. */}
      {!isLoading && nftsView?.length === 0 && <EmptyState minH={{ base: "300px", md: "600px" }} />}
    </>
  );
};

export default withQueryParams(
  {
    t: StringParam
  },
  TopNftsContent
);
