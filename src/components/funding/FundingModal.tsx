import { useState } from "react";
// types
import type { FundingConfig } from "components/funding";
// ui
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Stack, useToast } from "@chakra-ui/react";
import { FundingCard, FundingPledgeForm } from "components/funding";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nfts: FundingConfig["nfts"];
}

export function FundingModal({ isOpen, onClose, nfts }: Props) {
  const toast = useToast();
  const [status, setStatus] = useState("idle");
  const onSubmit = async () => {
    try {
      setStatus("loading");
    } catch (error) {
      setStatus("idle");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md" motionPreset="slideInBottom" isCentered>
        <ModalOverlay bg="rgba(53, 33, 181, 0.7)" />
        <ModalContent shadow="none" bg="transparent">
          <ModalCloseButton color="white" bg="whiteAlpha.400" right={{ base: "2", lg: "-2" }} top={{ base: "-12", lg: "-8" }} shadow="lg" />
          <ModalBody alignItems="flex-start">
            {/* Nfts */}

            <Stack d="block" w="100%" spacing="8" alignItems="flex-start" mb="8">
              {nfts?.map((nft: any, idx: number) => (
                <FundingCard key={idx} item={nft} />
              ))}
            </Stack>
            <FundingPledgeForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
