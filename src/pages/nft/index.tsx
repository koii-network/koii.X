import { RouteComponentProps } from "react-router-dom";
// api
import { useNft } from "hooks/api";
// utils
import { formatDigitNumber, formatUnixTimestamp } from "services/utils";
// ui
import { Box, Center, SimpleGrid, Heading, Text, Stack, Link, Button, Wrap, WrapItem, Badge, Spinner } from "@chakra-ui/react";
import { NftFootbar, NftMediaContainer } from "components/common";
// icons
import { RiExternalLinkLine } from "react-icons/ri";
import { KoiiIcon } from "components/icons";

interface RouteProps {
  id: string;
}

export function Nft({ match }: RouteComponentProps<RouteProps>) {
  /* Get nft based on url params */
  const { data: nft, isLoading } = useNft({ id: match?.params?.id });
  return (
    <Box py="4" px="4" color="blue.500" bg="white" w="100%" h={{ base: "unset", lg: "calc(100vh - 105px)" }} minH={{ base: "calc(100vh - 105px)" }}>
      <Center w="100%" maxW="1040px" h="100%" minH={isLoading ? "300px" : "unset"} mx="auto">
        {isLoading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />}
        {!isLoading && (
          <Box w="100%">
            {/* Details */}
            <SimpleGrid columns={[1, null, 2]} gap={{ base: "4", lg: "8" }} w="100%">
              {/* Media Container */}
              <Center maxH={{ base: "100%", lg: "100%" }} rounded="md" bg="gray.100" w="100%" h="100%" pos="relative" overflow="hidden" p="2">
                <NftMediaContainer nft={nft} />
              </Center>
              <Box d="flex" flexDir="column" rounded="md" shadow="card" w="100%" h="100%" pos="relative" overflow="hidden" p={{ base: "4", lg: "6" }}>
                {/* Title */}
                <Heading as="h2" size="lg" noOfLines={2} color="blue.500">
                  {nft?.title}
                </Heading>
                <Stack direction="row" align="center" mt="2">
                  <Text color="teal.500" fontSize="sm">
                    <Text as="span" d={{ base: "none", lg: "inline" }}>
                      Registered:
                    </Text>{" "}
                    <span>{formatUnixTimestamp(nft?.createdAt || "1616944045")}</span>
                  </Text>
                  <Button
                    as={Link}
                    variant="ghost"
                    colorScheme="gray"
                    href={`https://viewblock.io/arweave/tx/${nft?.id}`}
                    isExternal
                    rel="noopener noreferrer"
                    size="xs"
                    rightIcon={<RiExternalLinkLine />}
                  >
                    Explore block
                  </Button>
                </Stack>

                {/* Description */}
                <Text noOfLines={4} mt="3" fontSize="sm" lineHeight="short" mb={nft?.tags?.length > 0 ? "0" : "3"}>
                  {nft?.description}
                </Text>
                {/* Tags */}
                {nft?.tags?.length > 0 && (
                  <Wrap spacing="8px" mt="3" mb="3">
                    {nft?.tags?.map((tag: string) => (
                      <WrapItem key={tag}>
                        <Badge colorScheme="blue">{tag}</Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                )}
                {/* Stats */}
                <Stack direction="row" align="center" mt="auto" mb="4">
                  <Text color="teal.500" fontWeight="600">
                    {nft?.attention} Views
                  </Text>
                  <Stack direction="row" align="center">
                    <KoiiIcon boxSize="25px" />
                    <Text fontWeight="600">{formatDigitNumber(nft?.reward)} Koii earned</Text>
                  </Stack>
                </Stack>
                {/* Footbar */}
                <NftFootbar rounded="md" nft={nft} />
              </Box>
              {/* Info Container */}
            </SimpleGrid>
          </Box>
        )}
      </Center>
    </Box>
  );
}
