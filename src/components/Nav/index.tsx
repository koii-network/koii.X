import { Link } from "react-router-dom";
// context
import { useFinnie } from "components/context/finnie";
// ui
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export default function Nav() {
  const {
    state: { connectFinnie, isLoading, isFinnieConnected }
  } = useFinnie();
  return (
    <Box color="white" bg="blue.500">
      <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="3" px="4">
        <Heading as={Link} to="/" size="md">
          My Koii App
        </Heading>
        {/* Connect to finnie button */}
        {isFinnieConnected ? null : (
          <Button isLoading={isLoading} onClick={connectFinnie}>
            {isLoading ? "Connecting..." : "Connect finnie"}
          </Button>
        )}
      </Flex>
    </Box>
  );
}
