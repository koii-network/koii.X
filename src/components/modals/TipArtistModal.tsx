import { useState } from "react";
import { useForm } from "react-hook-form";
// context
import { useFinnie } from "components/finnie";
// api
import { sendKoiiTip } from "api/finnie";
// ui
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  useToast,
  Badge,
  Code,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage
} from "@chakra-ui/react";
// icons
import { FaHandHoldingUsd } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  artistAddress: string;
  artistName: string;
}

export function TipArtistModal({ isOpen, onClose, artistAddress, artistName }: Props) {
  /* Finnie */
  const {
    state: { connectFinnie, isLoading, walletBalance, isFinnieConnected }
  } = useFinnie();

  const toast = useToast();
  const [status, setStatus] = useState("idle");

  /* Form */
  const {
    handleSubmit,
    register,

    formState: { errors }
  } = useForm({
    mode: "onTouched"
  });

  /* Submit */
  const onSubmit = async (values: any) => {
    try {
      setStatus("loading");
      await sendKoiiTip(artistAddress, parseInt(values?.amount)).then(() => {
        toast({
          title: "Thank you!",
          description: "Tip successfully sent",
          status: "success",
          isClosable: true
        });
        onClose();
        setStatus("idle");
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "An error occurred sending your tip",
        status: "error",
        isClosable: true
      });
      setStatus("idle");
    }
  };

  /* Derived States */
  const koiiBalance = walletBalance?.koii?.toFixed?.(2);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader as={Flex} align="center">
          <FaHandHoldingUsd />
          <Text as="span" ml="2" mr="2">
            Send tip
          </Text>
          {artistName ? (
            <Badge as="span" fontSize="xs" textTransform="unset">
              To {artistName}
            </Badge>
          ) : (
            <Text as="span" d="flex" align="center" fontSize="xs">
              To
              <Code as="span" ml="1" noOfLines={1} maxW="150px" title={artistAddress}>
                {artistAddress}
              </Code>
            </Text>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="amount" isInvalid={errors.amount}>
            <Flex align="center" justify="space-between">
              <FormLabel>Amount</FormLabel>
              {isFinnieConnected && (
                <Text fontSize="xs" color="blue.300">
                  Your Koii balance: {koiiBalance}
                </Text>
              )}
            </Flex>
            <NumberInput isInvalid={errors.amount} size="sm" precision={2} min={0.01} max={koiiBalance} clampValueOnBlur={false}>
              <NumberInputField
                {...register("amount", {
                  required: true,
                  min: 0.01,
                  max: koiiBalance
                })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{!isFinnieConnected ? "Connect to finnie" : errors.amount?.type === "max" ? `Max tip allowed ${koiiBalance}` : "Required"}</FormErrorMessage>
          </FormControl>

          <Flex fontSize="sm" fontWeight="500" flexDir="column" maxW="300px" mt="3">
            <Flex justify="space-between">
              <Text>Tip:</Text>
              <Text>Koii</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Arweave fee:</Text>
              <Text>~0.00000151 AR</Text>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          {isFinnieConnected ? (
            <Button type="submit" colorScheme={errors?.amount ? "red" : "blue"} isLoading={status === "loading"}>
              Send Tip
            </Button>
          ) : (
            <Button isLoading={isLoading} onClick={connectFinnie}>
              {isLoading ? "Connecting..." : "Connect finnie"}
            </Button>
          )}
        </ModalFooter>
        {/*  */}
      </ModalContent>
    </Modal>
  );
}
