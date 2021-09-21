import React from 'react';
import { Link } from 'react-router-dom';
// chakra
import { Flex, Box, IconButton, Button, InputGroup, InputRightElement, Input, useMediaQuery, useDisclosure } from '@chakra-ui/react';

// ui
import { WelcomeToKoii } from 'components/modals';

// icons
import { WhiteLogo } from 'assets/icons';
import { RiSearchLine } from 'react-icons/ri';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Nav() {
  const [showNav, setShowNav] = React.useState(false);
  function toggleNav() {
    setShowNav(showNav => !showNav);
  }

  // Handle closing mobile menu when user clicks anywhere outside the menu.
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (menuRef.current && !menuRef.current?.contains(event.target as Node)) {
      setShowNav(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  // useMedia
  const [isOnMobile] = useMediaQuery('(max-width: 48em)');

  // Modals
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <WelcomeToKoii isOpen={isOpen} onClose={onClose} />
      <Flex as="nav" w="100%" h="60px" px={[4, 10]} justify="space-between" alignItems="center" borderBottomWidth="1px" bg="brand.500" color="white" border="none" ref={menuRef}>
        <Link to="/">
          <WhiteLogo boxSize="40px" mr="6" />
        </Link>

        {/* Mobile Hamburger Icon */}

        <IconButton fontSize="2xl" d={{ base: 'flex', md: 'none' }} justifyContent="center" variant="unstyled" aria-label="Open menu" icon={!showNav ? <FaBars /> : <FaTimes />} onClick={toggleNav} />

        {/* Desktop + Mobile Menu */}
        <Flex
          w="100%"
          flexDir={{ base: 'column', md: 'row' }}
          display={{
            base: showNav ? 'flex' : 'none',
            md: 'flex'
          }}
          pos={{ base: 'absolute', md: 'unset' }}
          top="60px"
          left="0px"
          py={{ base: '4', md: 'unset' }}
          px={{ base: '4', md: 'unset' }}
          bg={{ base: 'brand.500', md: 'unset' }}
          sx={
            isOnMobile
              ? {
                  '& > *:not(last-child)': {
                    marginBottom: '1rem'
                  }
                }
              : {}
          }
          borderBottomWidth={{ base: '4px', md: '0px' }}
          borderColor="brand.200"
        >
          <Button colorScheme="white" variant="link" onClick={onOpen}>
            What's Koii?
          </Button>

          {/* Spacer */}
          <Spacer />

          {/* Search Input */}

          <div>
            <InputGroup>
              <Input placeholder="Search..." color="black" />
              <InputRightElement pointerEvents="none" color="gray.300" children={<RiSearchLine />} />
            </InputGroup>
          </div>

          {/* Spacer */}
          <Spacer />

          {/* Right Menu */}
          <Button colorScheme="white" variant="link" as={Link} to="/faucet" mr={{ base: 'unset', md: '8' }}>
            Get KOII
          </Button>
          <Button colorScheme="white" color="brand.500">
            Connect Wallet
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

function Spacer() {
  return <Box ml="auto" d={{ base: 'none', md: 'block' }} />;
}
