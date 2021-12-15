// ui
import { Flex, Link, Box, Image, Heading, Text } from "@chakra-ui/react";

interface Props {
  item: Record<string, any>;
}

export default function NftCard({ item }: Props) {
  return (
    <Flex
      as={Link}
      flexDir="column"
      w="100%"
      href={`https://koi.rocks/content-details/${item?.id}`}
      isExternal
      rel="noopener noreferrer"
      textDecor="none"
      role="group"
      rounded="md"
      overflow="hidden"
      _hover={{ textDecor: "none" }}
    >
      {/* Thumbnail */}
      <Image src={`https://koii.live/${item?.id}.png`} alt={item?.title} loading="lazy" objectFit="cover" bg="gray.100" h="150px" roundedTopLeft="1" roundedTopRight="1" />
      {/* Details */}
      <Flex flexDir="column" roundedBottomLeft="1" roundedBottomRight="1" p="2" bg="white" shadow="md" flexGrow="1" textAlign="left">
        {/* Title */}
        <Heading as="h2" size="sm" noOfLines={2} mb="1px" color="blue.500" _groupHover={{ textDecor: "underline" }}>
          {item?.title}{" "}
          <Box d="none" _groupHover={{ d: "inline" }} className="nft--icon">
            <Box as="span" lineHeight="1">
              ↗
            </Box>
          </Box>
        </Heading>
        {/* Description */}
        <Text noOfLines={3} fontSize="xs" mb="1" color="blue.500" lineHeight="short">
          {item?.description}
        </Text>
      </Flex>
    </Flex>
  );
}
