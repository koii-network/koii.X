import { ReactNode, useMemo, memo } from "react";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
// api
import { useArtist } from "api/hooks";
// ui
import { Box, Center, SimpleGrid, Heading, Text, Stack, Button, Spinner, Image, StackDivider, Code, BoxProps, Kbd } from "@chakra-ui/react";
import { CopyableAddress, EmptyState, ErrorState } from "components/ui";
import { NftFeaturedCard } from "components/cards";
// icons
import { RiUserSmileLine } from "react-icons/ri";

interface RouteProps {
  id: string;
}

export function Artist({ match }: RouteComponentProps<RouteProps>) {
  /* Get artist based on url params */
  const { data: artist, isLoading, isError } = useArtist({ id: match?.params?.id });

  const artistData = useMemo(() => {
    return {
      name: artist?.nfts?.[0]?.name,
      description: artist?.nfts?.[0]?.description,
      pieces: artist?.nfts?.length
    };
  }, [artist]);

  /* on Error */
  if (isError)
    return (
      <ArtistWrapper>
        <ErrorState title="Oops!" description="An error occurred getting artist data!">
          <Button as={RouterLink} to="/">
            Go to leaderboard
          </Button>
        </ErrorState>
      </ArtistWrapper>
    );
  /* on Loading */
  if (isLoading)
    return (
      <ArtistWrapper>
        <Center h="300px">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />
        </Center>
      </ArtistWrapper>
    );
  /* on Success */
  return (
    <ArtistWrapper p="0px">
      {/* Random cover image */}
      <ArtistCover nfts={artist?.nfts} />
      <Box px={{ base: "4", lg: "0" }} maxW="800px" mx="auto" pb="20">
        {/* Details */}
        <Stack direction={{ base: "column", lg: "row" }} w="100%" spacing={{ base: "20px", lg: "40px" }} mt="-135px" pb={{ base: "25px", lg: "50px" }}>
          {/* Avatar */}
          <Center bg="gray.100" border="15px solid white" boxSize="240px" shadow="card" mx="auto" rounded="full" color="blue.100" flexBasis="240px" flexShrink="0">
            <RiUserSmileLine size="100px" />
          </Center>
          {/* Details */}
          <Box d="flex" flexDir="column" rounded="md" bg="white" shadow="card" p={{ base: "4", lg: "8" }} flexBasis="100%">
            {/* Address */}
            <CopyableAddress address={match?.params?.id} mb="2" w="100%" maxW="300px" />

            {/* <Heading d="flex" alignItems="center" as="h2" size="lg" noOfLines={1} color="blue.500">
              {artistData?.name}
            </Heading> */}
            {/* Description */}
            <Text noOfLines={4} mt="1" mb="2" fontSize="sm" lineHeight="short">
              {artistData?.description}
            </Text>
            {/* Stats */}
            <Stack direction={{ base: "column", lg: "row" }} divider={<StackDivider borderColor="gray.200" />} mt="auto" w="100%">
              <Stat label="Total views" amount={artist?.totalAttention} />
              <Stat label="Pieces" amount={artistData?.pieces} />
              <Stat label="Total Koii Earned" amount={artist?.totalReward} />
            </Stack>
          </Box>
        </Stack>
        {/* Nfts grid */}

        {artist?.nfts?.length !== 0 && (
          <SimpleGrid w="100%" minW="0" minH="0" gap="8" columns={[1, 2, 3]}>
            {artist?.nfts?.map((nft: Record<string, any>) => (
              <NftFeaturedCard nft={nft} key={nft?.id} />
            ))}
          </SimpleGrid>
        )}

        {/* No nfts to show. */}
        {artist?.nfts?.length === 0 && <EmptyState minH={{ base: "300px", md: "600px" }} />}
      </Box>
    </ArtistWrapper>
  );
}

interface StatProps {
  label: string;
  amount: any;
}

const Stat = ({ label, amount }: StatProps) => (
  <Center flexDir="column" color="blue.500" flex="1">
    <Text mb="1px" fontWeight="600">
      {label}
    </Text>
    <Text fontSize="lg">{amount}</Text>
  </Center>
);

interface ArtistCoverProps {
  nfts?: any[];
}

const ArtistCover = memo<ArtistCoverProps>(
  ({ nfts }) => {
    const nftsWithImages = nfts?.filter((nft: any) => nft?.contentType?.includes?.("image"));
    const randomNftWithImage = nftsWithImages?.[Math.floor(Math.random() * nftsWithImages?.length)];
    const coverUrl = `https://arweave.net/${randomNftWithImage?.id}`;

    return (
      <Box w="100%" bg="gray.100" h={{ base: "200px", lg: "300px" }}>
        <Image src={coverUrl} alt="artist-cover" w="100%" h="100%" objectFit="cover" />
      </Box>
    );
  },
  () => true
);

interface ArtistWrapperProps extends BoxProps {
  children: ReactNode;
}
const ArtistWrapper = ({ children, ...restProps }: ArtistWrapperProps) => {
  return (
    <Box py="4" px="4" color="blue.500" bg="white" w="100%" minH={{ base: "calc(100vh - 105px)" }} {...restProps}>
      {children}
    </Box>
  );
};
