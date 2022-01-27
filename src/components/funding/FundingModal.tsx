import { useState } from "react";
import { useFunding } from "components/funding";
// ui
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Stack, Text, Button, useToast } from "@chakra-ui/react";
import { FundingCard, FundingPledgeForm } from "components/funding";
import { connectToMetaMask } from "api/wallet";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function FundingModal({ isOpen, onClose }: Props) {
  // config
  const {
    state: { config, fundModal },
    dispatch
  } = useFunding();

  const nfts = config?.nfts;

  const toast = useToast();
  const [status, setStatus] = useState<string>("idle");

  /* Helpers */

  const doSendToken = async () => {
    console.log(`Sending ${fundModal.tokenAmount} eth to ${fundModal?.ethAddress}...`);
  };

  const onPledgeFormSubmit = async (amount?: number) => {
    dispatch({
      type: "CHANGE_MODAL_FIELDS",
      payload: {
        tokenAmount: amount,
        step: "connect-wallet"
      }
    });
  };

  const doConnectToMetaMask = async () => {
    setStatus("loading");
    await connectToMetaMask()
      .then(async res => {
        setStatus("idle");
        /* Connected, Save address */
        dispatch({
          type: "CHANGE_MODAL_FIELDS",
          payload: {
            ethAddress: res?.ethAddress,
            isWalletConnected: true,
            step: "confirm"
          }
        });
        /* Send Token */
        doSendToken();
      })
      .catch(err => {
        setStatus("idle");
        if (err?.message === "extension_not_installed") {
          toast({ status: "error", title: "You don't have MetaMask installed", isClosable: true });
        } else if (err?.message === "no_accounts") {
          toast({
            status: "error",
            title: "Please add an account your MetaMask",
            isClosable: true
          });
        } else {
          toast({
            status: "error",
            title: "There was an error connecting MetaMask. Please try again.",
            isClosable: true
          });
        }
      });
  };

  /* Derived States */
  const step = fundModal.step;
  const isModalCentered = step !== "select-payment";
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md" motionPreset="slideInBottom" isCentered>
        <ModalOverlay bg="rgba(53, 33, 181, 0.7)" />
        <ModalContent shadow="none" bg="transparent" my={isModalCentered ? "auto" : "60px"} color="blue.500">
          <ModalCloseButton color="white" bg="whiteAlpha.400" right={{ base: "2", lg: "-2" }} top={{ base: "-12", lg: "-8" }} shadow="lg" />
          {/* Select Payment */}
          {step === "select-payment" && (
            <ModalBody alignItems="flex-start">
              {/* Nfts */}
              <Stack d="block" w="100%" spacing="8" alignItems="flex-start" mb="8">
                {nfts?.map((nft: any, idx: number) => (
                  <FundingCard key={idx} item={nft} />
                ))}
              </Stack>
              <FundingPledgeForm onSubmit={onPledgeFormSubmit} />
            </ModalBody>
          )}

          {/* Connect Wallet */}
          {step === "connect-wallet" && (
            <ModalBody alignItems="center">
              <Stack align="center" spacing="12px" w="100%" maxW="304px" mx="auto" bg="white" rounded="12px" py="4" px="8">
                <Text fontWeight="600">Connect a Wallet</Text>
                <Button w="100%" variant="outline" boxShadow="0px 2px 4px rgba(0, 0, 0, 0.16)" size="lg" onClick={doConnectToMetaMask} isLoading={status === "loading"}>
                  MetaMask
                </Button>
              </Stack>
            </ModalBody>
          )}

          {step === "confirm" && (
            <ModalBody alignItems="center">
              <Stack align="center" spacing="12px" w="100%" maxW="304px" mx="auto" bg="white" rounded="12px" py="4" px="8">
                <Text fontWeight="600">Confirm</Text>
                <Button w="100%" size="lg" onClick={doConnectToMetaMask} isLoading={status === "loading"}>
                  Fund with {fundModal?.tokenAmount} eth
                </Button>
              </Stack>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
