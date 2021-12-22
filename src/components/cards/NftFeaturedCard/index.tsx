import { useState, memo } from "react";
import { motion } from "framer-motion";
// api
import { useNft } from "hooks/api";
// ui
import { Flex, Link, Image, Heading, Text, Center, Spinner, Stack, ButtonGroup, Button, Skeleton, useDisclosure } from "@chakra-ui/react";
import { ReportModal, ShareModal, TipArtistModal } from "components/modals";
// assets
import fallbackImage from "assets/fallback.png";

interface Props {
  nft: Record<string, any>;
}

export function NftFeaturedCard({ nft }: Props) {
  const MotionFlex = motion(Flex);
  const { data: item, isLoading } = useNft({ id: nft?.id });

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
        <ThumbnailContainer nft={item} />
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
        <Footbar nft={item} />
      </MotionFlex>
    </>
  );
}

/* Thumbnail */
const ThumbnailContainer = ({ nft }: Props) => {
  const [isFailed, setIsFailed] = useState(false);
  const onError = () => {
    setIsFailed(true);
  };

  return (
    <Image
      /*  fallback to arweave iframe if the thumbnail not generated yet on Koii side */
      src={isFailed ? `https://arweave.net/${nft?.id}` : `https://koii.live/${nft?.id}.png`}
      fallback={<ThumbnailLoading />}
      fallbackSrc={fallbackImage}
      onError={onError}
      h="200px"
      alt={nft?.title}
      objectFit="cover"
      bg="gray.200"
      roundedTop="md"
    />
  );
};

function ThumbnailLoading() {
  return (
    <Center h="200px" bg="gray.100" w="100%">
      <Spinner thickness="2px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="md" />
    </Center>
  );
}

/* Footbar */

const Footbar = ({ nft }: Props) => {
  /* Modal */
  const { isOpen: isReportModalOpen, onOpen: openReportModal, onClose: closeReportModal } = useDisclosure();
  const { isOpen: isShareModalOpen, onOpen: openShareModal, onClose: closeShareModal } = useDisclosure();
  const { isOpen: isTipModalOpen, onOpen: openTipModal, onClose: closeTipModal } = useDisclosure();

  return (
    <>
      {/* Modals */}
      {isReportModalOpen && <ReportModal isOpen={isReportModalOpen} onClose={closeReportModal} nftId={nft?.id} nftTitle={nft?.title} />}
      {isShareModalOpen && <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} nftId={nft?.id} nftTitle={nft?.title} />}
      {isTipModalOpen && <TipArtistModal isOpen={isTipModalOpen} onClose={closeTipModal} artistAddress={nft?.owner} artistName={nft?.name} />}

      <Stack direction="row" p="2" roundedBottom="md" bg="blue.500" color="white">
        <ButtonGroup
          w="100%"
          size="xs"
          isAttached
          onClick={e => {
            e.preventDefault();
          }}
        >
          <Button aria-label="tip" children="Tip Artist" onClick={openTipModal} />
          <Button aria-label="tip" children="Share" onClick={openShareModal} />
          <Button aria-label="tip" children="Report" ml="auto" onClick={openReportModal} />
        </ButtonGroup>
      </Stack>
    </>
  );
};
