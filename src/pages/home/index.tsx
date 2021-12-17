// ui
import { Box, Center } from "@chakra-ui/react";
import { DragAndDropUploader } from "components/upload";

export function Home() {
  return (
    <Box py="4" px="4" color="blue.500" bg="white">
      {/* Container */}
      <Box maxW="container.lg" mx="auto">
        {/* Drag and drop uploader to Koi.rocks */}
        <DragAndDropUploader />
        {/* Leaderboard */}
        <Center bg="gray.100" p="2" h="600px" rounded="sm" border="1px dashed" borderColor="gray.200" mt="2" color="gray.500">
          {`<Leaderboard/>`}
        </Center>
      </Box>
    </Box>
  );
}
