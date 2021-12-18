// ui
import { Box, Flex, Heading, Stack, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { TimeFilter, NsfwFilter } from "components/common";

export function Leaderboard() {
  return (
    <Box color="blue.500" bg="gray.50" rounded="sm" p="2">
      {/* Header */}
      <Flex align="center" justify="space-between">
        <Heading size="lg">Top content</Heading>
        {/* Filter */}
        <Stack>
          <TimeFilter />
          <NsfwFilter />
        </Stack>
      </Flex>
    </Box>
  );
}
