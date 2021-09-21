import React from 'react';
import { Stack, Modal, Text, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button, Link } from '@chakra-ui/react';

interface WelcomeToKoiiProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeToKoii(props: WelcomeToKoiiProps) {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent maxW="550px">
        <ModalHeader>Welcome to Koii</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          sx={{
            '& a': {
              color: 'blue.500'
            }
          }}
        >
          <Stack w="100%" align="center" textAlign="center">
            <Text>
              <Link href="http://koii.network/" isExternal>
                Koii
              </Link>{' '}
              is a blockchain project built for media, not just currency.
            </Text>
            <Text>
              This is the attention leaderboard. Here you will see all the Koii-registered content with the most views. Any time you click on an{' '}
              <Link href="http://atomicnft.com/" isExternal>
                Atomic NFT
              </Link>
              , the creator will earn{' '}
              <Link href="https://blog.koii.network/Yield-Farming-for-NFTs/" isExternal>
                attention rewards
              </Link>
              .
            </Text>
            <Text>
              Create your own NFT and <strong>start earning rewards today</strong> with Finnie, the best NFT wallet out there.
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button as={Link} href="https://chrome.google.com/webstore/detail/finnie/cjmkndjhnagcfbpiemnkdpomccnjblmj" isExternal colorScheme="brand" onClick={onClose}>
            Get Finnie
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
