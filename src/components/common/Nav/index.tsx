import { Link } from "react-router-dom";
// context
import { useFinnie } from "components/finnie";
// ui
import { Button, Box, Flex, Heading, Stack, Menu, MenuButton, MenuList, MenuItem, Text, IconButton, Tooltip } from "@chakra-ui/react";
// icons
import { IoRemoveCircle } from "react-icons/io5";
import { ArweaveIcon, KoiiIcon } from "components/icons";
import { RiUser4Line } from "react-icons/ri";

export function Nav() {
  const {
    state: { connectFinnie, disconnectFinnie, isLoading, isFinnieConnected, walletBalance, walletAddress }
  } = useFinnie();
  return (
    <Box bg="blue.500" px="4" color="white">
      <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="3">
        <Heading as={Link} to="/" size="md">
          My Koii App
        </Heading>
        {/* Connect to finnie button */}
        {isFinnieConnected ? (
          <Stack direction="row" align="center" spacing="1">
            <Menu>
              <MenuButton>
                <Stack align="center" direction="row" spacing="4" cursor="pointer" bg="blue.400" px="2" py="1" rounded="sm" fontSize="sm" fontWeight="600">
                  {/* Koii balance */}
                  <Stack direction="row" align="center">
                    <KoiiIcon boxSize="25px" />
                    <Text lineHeight="1">{walletBalance?.koii?.toFixed?.(2)}</Text>
                  </Stack>
                  {/* Arweave balance */}
                  <Stack direction="row" align="center">
                    <ArweaveIcon boxSize="22px" />
                    <Text lineHeight="1">{walletBalance?.ar?.toFixed?.(3)}</Text>
                  </Stack>
                </Stack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={disconnectFinnie} color="red" icon={<IoRemoveCircle size="20px" />}>
                  Disconnect finnie
                </MenuItem>
              </MenuList>
            </Menu>
            <Tooltip bg="blue.500" color="white" hasArrow placement="bottom" label="My content">
              <IconButton as={Link} to={`/artist/${walletAddress}`} icon={<RiUser4Line size="20px" />} aria-label="go-to-my-page" bg="blue.400" rounded="sm" h="33px" />
            </Tooltip>
          </Stack>
        ) : (
          <Button isLoading={isLoading} onClick={connectFinnie}>
            {isLoading ? "Connecting..." : "Connect finnie"}
          </Button>
        )}
      </Flex>
    </Box>
  );
}
