// ui
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { TimeFilter, NsfwFilter } from "components/common";
import { TopNftsContent } from "components/sections";

export function Leaderboard() {
  return (
    <Box color="blue.500" bg="gray.50" rounded="sm" p="2">
      {/* Header */}
      <Flex align="center" justify="space-between" mb="4">
        <Heading size="lg">Top content</Heading>
        <Stack>
          {/* Filters */}
          <TimeFilter />
          <NsfwFilter />
          {/* Nfts */}
        </Stack>
      </Flex>
      <TopNftsContent />
    </Box>
  );
}
