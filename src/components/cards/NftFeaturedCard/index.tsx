import { motion } from "framer-motion";
// api
import { useNft } from "hooks/api";
// ui
import { Flex, Link, Image, Heading, Text, Center, Spinner, Stack, ButtonGroup, IconButton, Button, Skeleton } from "@chakra-ui/react";

interface Props {
  nft: Record<string, any>;
}

export function NftFeaturedCard({ nft }: Props) {
  const MotionFlex = motion(Flex);
  const { data: item, isLoading } = useNft({ id: nft?.id });
  console.log({ item });

  return (
    <>
      {isLoading && (
        <Stack w="100%" spacing="4">
          <Skeleton h="200px" w="100%" />
          <div>
            <Skeleton h="50px" w="100%" mb="2" />
            <Skeleton h="50px" w="100%" />
          </div>
        </Stack>
      )}
      <MotionFlex
        as={Link}
        flexDir="column"
        w="100%"
        href={`https://koi.rocks/content-details/${nft?.id}`}
        isExternal
        rel="noopener noreferrer"
        textDecor="none"
        role="group"
        rounded="md"
        shadow="card"
        _hover={{ textDecor: "none" }}
        whileHover={{
          translateY: -3
        }}
      >
        {/* Thumbnail */}
        <Image src={`https://koii.live/${nft?.id}.png`} h="200px" alt={item?.title} loading="lazy" objectFit="cover" bg="gray.200" roundedTop="md" />
        {/* Details */}
        <Flex flexDir="column" p="4" bg="white" flexGrow="1" textAlign="left">
          {/* Title */}
          <Heading as="h2" size="md" noOfLines={2} mb="2px" color="blue.500">
            {item?.title}
          </Heading>
          {/* Description */}
          <Text noOfLines={2} fontSize="sm" color="blue.200" lineHeight="short">
            {item?.description}
          </Text>
        </Flex>
        {/* Footbar */}
        <Stack direction="row" p="2" roundedBottom="md" bg="blue.500" color="white">
          <ButtonGroup
            w="100%"
            size="xs"
            isAttached
            onClick={e => {
              e.preventDefault();
            }}
          >
            <Button aria-label="tip" children="Tip Artist" />
            <Button aria-label="tip" children="Share" />
            <Button aria-label="tip" children="Report" ml="auto" />
          </ButtonGroup>
        </Stack>
      </MotionFlex>
    </>
  );
}

function MediaLoading() {
  return (
    <Center h="200px" bg="gray.100" w="100%">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="md" />
    </Center>
  );
}
