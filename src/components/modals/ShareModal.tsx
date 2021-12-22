import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Stack,
  Heading,
  Box,
  IconButton,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
  Input,
  useClipboard,
  Link,
  Text
} from "@chakra-ui/react";
// icons
import { RiTwitterLine, RiLinkedinLine, RiShareLine, RiFacebookFill, RiMailAddLine } from "react-icons/ri";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nftId: string;
  nftTitle: string;
}

export function ShareModal({ isOpen, onClose, nftId, nftTitle }: Props) {
  const permalink = `https://koii.live/${nftId}/.html`;
  const embedLink = `<iframe width="100%" src="${permalink}" title="Koii  NFT image" frameborder="0" allowfullscreen></iframe>`;

  const { hasCopied: hasPermainkCopied, onCopy: onPermalinkCopy } = useClipboard(permalink);
  const { hasCopied: hasEmbedLinkCopied, onCopy: onEmbedLinkCopy } = useClipboard(embedLink);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Stack} direction="row" align="center" fontSize={{ base: "sm", md: "lg", lg: "xl" }}>
          <RiShareLine />
          <div>
            <Text as="span">Share</Text>{" "}
            <Text as="span" color="blue.500">
              {nftTitle}
            </Text>
          </div>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack w="100%" alignItems="flex-start">
            {/* Inputs */}
            <Stack spacing="6" w="100%" fontWeight="600">
              {/* Share */}
              <FormControl>
                <FormLabel htmlFor="share">Share:</FormLabel>
                <InputGroup>
                  <Input name="share" id="share" isReadOnly value={permalink} />
                  <Box pos="relative">
                    <InputRightAddon
                      w="135px"
                      d="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      textAlign="center"
                      children={hasPermainkCopied ? "Copied" : "Copy share link"}
                      onClick={onPermalinkCopy}
                    />
                  </Box>
                </InputGroup>
              </FormControl>
              {/* Embed */}
              <FormControl>
                <FormLabel htmlFor="embed">Embed:</FormLabel>
                <InputGroup>
                  <Input name="embed" id="embed" isReadOnly value={embedLink} />
                  <Box pos="relative">
                    <InputRightAddon
                      w="135px"
                      d="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      children={hasEmbedLinkCopied ? "Copied" : "Copy embed link"}
                      onClick={onEmbedLinkCopy}
                    />
                  </Box>
                </InputGroup>
              </FormControl>
            </Stack>

            <Stack w="100%" justify="center" spacing={{ base: "10", lg: "10" }} direction="row" py="4">
              {/* Social Share */}
              <IconButton
                as={Link}
                isExternal
                href={`https://twitter.com/share?url=${permalink}`}
                aria-label="share-to-twitter"
                size="lg"
                variant="ghost"
                icon={<RiTwitterLine size="30px" />}
                rounded="full"
              />

              <IconButton
                as={Link}
                isExternal
                href={`https://www.facebook.com/sharer/sharer.php?u=${permalink}`}
                aria-label="share-to-facebook"
                size="lg"
                variant="ghost"
                icon={<RiFacebookFill size="30px" />}
                rounded="full"
              />

              <IconButton
                as={Link}
                isExternal
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`}
                aria-label="share-to-linkedin"
                size="lg"
                variant="ghost"
                icon={<RiLinkedinLine size="30px" />}
                rounded="full"
              />
              <IconButton
                as="a"
                href={`mailto:?subject=I want to share this with you ${permalink}`}
                aria-label="share-to-email"
                size="lg"
                variant="ghost"
                icon={<RiMailAddLine size="30px" />}
                rounded="full"
              />
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
