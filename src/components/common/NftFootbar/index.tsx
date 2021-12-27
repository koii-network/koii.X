// ui
import { Stack, Button, useDisclosure, ButtonGroup, StackProps } from "@chakra-ui/react";
import { ReportModal, ShareModal, TipArtistModal } from "components/modals";

/* Footbar */
interface Props extends StackProps {
  nft: Record<string, any>;
}

export const NftFootbar = ({ nft, ...restProps }: Props) => {
  /* Modal */
  const { isOpen: isReportModalOpen, onOpen: openReportModal, onClose: closeReportModal } = useDisclosure();
  const { isOpen: isShareModalOpen, onOpen: openShareModal, onClose: closeShareModal } = useDisclosure();
  const { isOpen: isTipModalOpen, onOpen: openTipModal, onClose: closeTipModal } = useDisclosure();

  return (
    <>
      {/* Modals */}
      {isReportModalOpen && <ReportModal isOpen={isReportModalOpen} onClose={closeReportModal} nftId={nft?.id} nftTitle={nft?.title} />}
      {isShareModalOpen && <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} nftId={nft?.id} nftTitle={nft?.title} />}
      {isTipModalOpen && <TipArtistModal isOpen={isTipModalOpen} onClose={closeTipModal} artistAddress={nft?.owner || nft?.creator} artistName={nft?.name} />}

      <Stack direction="row" p="2" roundedBottom="md" bg="blue.500" color="white" zIndex="3" {...restProps}>
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
