import { useState } from "react";
// api

import { voteAsNsfw } from "services/api";
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
  Checkbox,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  useToast
} from "@chakra-ui/react";
// icons
import { RiFlagFill } from "react-icons/ri";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nftId: string;
  nftTitle: string;
}

export function ReportModal({ isOpen, onClose, nftId, nftTitle }: Props) {
  const toast = useToast();
  const [status, setStatus] = useState("idle");
  const onSubmit = async () => {
    try {
      setStatus("loading");
      await voteAsNsfw(nftId).then(() => {
        toast({
          title: "Thanks.",
          description: "Nft successfully reported",
          status: "success",
          isClosable: true
        });
        onClose();
        setStatus("idle");
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: "An error occurred reporting this nft",
        status: "error",
        isClosable: true
      });
      setStatus("idle");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as={Flex} align="center">
            <RiFlagFill />
            <Text as="span" ml="2" mr="1">
              Report
            </Text>
            <Text as="span" color="blue.500">
              {nftTitle}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="600">Help us understand the issue. What’s wrong with this NFT?</Text>
            <Stack my="4" color="blue.500">
              <Checkbox>Explicit or adult sexual content</Checkbox>
              <Checkbox>Copyright infringement (the person who posted it doesn’t own it)</Checkbox>
              <Checkbox>Illegal products or services</Checkbox>
              <Checkbox>Hate speech or harassment</Checkbox>
            </Stack>
            <FormControl>
              <FormLabel>Add any details that will help us evaluate the problem.</FormLabel>
              <Textarea />
            </FormControl>
            <FormControl id="attachments" mt="2">
              <Stack direction="row" align="center" spacing="0">
                <FormLabel bg="blue.500" m="0 6px 0 0" p="2" textAlign="center" w="100px" color="white" rounded="md" cursor="pointer">
                  Attach file
                </FormLabel>
                <Text color="blue.300" fontSize="xs">
                  Images are especially helpful in addressing copyright claims.
                </Text>
              </Stack>
              <Input name="attachments" hidden type="file" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSubmit} isLoading={status === "loading"}>
              Submit
            </Button>
          </ModalFooter>
          {/*  */}
        </ModalContent>
      </Modal>
    </>
  );
}
