// context
import { useFinnie } from "components/context/finnie";
// ui
import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export default function Nav() {
  const {
    state: { connectFinnie, isLoading, isFinnieConnected }
  } = useFinnie();
  return (
    <Box color="white" bg="blue.500">
      <Flex mx="auto" maxW="container.lg" justify="space-between" align="center" py="2" px="4">
        <h2>Koii App</h2>
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
