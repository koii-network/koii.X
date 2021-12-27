// ui
import { Box, Center, SimpleGrid, Image, Spinner } from "@chakra-ui/react";
// utils
import { getMediaType, triggerPort } from "services/utils";

interface Props {
  nft: Record<string, any>;
}

export const NftMediaContainer = ({ nft }: Props) => {
  const contentType = getMediaType(nft?.contentType);
  const arweaveUrl = `https://arweave.net/${nft?.id}`;

  const IframeContainer = () => <Box as="iframe" src={arweaveUrl} onLoad={() => triggerPort(nft?.id)} boxSize="100%" />;
  const ImageContainer = () => <Image src={arweaveUrl} onLoad={() => triggerPort(nft?.id)} boxSize="100%" objectFit="cover" />;
  const VideoContainer = () => (
    <Box as="video" controls muted onLoadedData={() => triggerPort(nft?.id)} boxSize="100%">
      <source src={arweaveUrl} />
    </Box>
  );

  const renderContainer = () => {
    switch (contentType) {
      case "image":
        return <ImageContainer />;
      case "video":
        return <VideoContainer />;
      case "iframe":
        return <IframeContainer />;
      default:
        return <></>;
    }
  };
  return (
    <Box rounded="md" overflow="hidden" boxSize={{ base: "300px", lg: "500px" }}>
      {renderContainer()}
    </Box>
  );
};
