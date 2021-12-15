import { Link } from "react-router-dom";
// ui
import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export default function Footer() {
  return (
    <Box color="white" bg="blue.500">
      <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="2" px="4">
        <p>© Koii</p>
        <Button as={Link} to="https://github.com/koii-network/koii.X#readme" target="_blank">
          Documentations ↗
        </Button>
      </Flex>
    </Box>
  );
}
