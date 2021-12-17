// ui
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export function Footer() {
  return (
    <Box color="white" bg="blue.500">
      <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="2" px="4">
        <p>© Koii</p>
        <Button as={Link} isExternal href="https://github.com/koii-network/koii.X#readme">
          Documentations ↗
        </Button>
      </Flex>
    </Box>
  );
}
