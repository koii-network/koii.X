// ui
import { Box, Text, Stack } from "@chakra-ui/react";

interface Props {
  raised: number;
  goal: number;
}
export function FundingBar({ raised, goal }: Props) {
  const percentageDone = ((raised / goal) * 100).toFixed(2);
  return (
    <Box>
      <Text textAlign="right" fontSize="xs" mb="2px">{`%${percentageDone}`}</Text>
      {/* Bar */}
      <Box pos="relative" w="100%" rounded="2xl" bg="#D6D6D6" h="22px">
        <Box w={`${percentageDone}%`} bg="#237B75" pos="absolute" zIndex="1" top="0" h="100%" left="0" rounded="2xl" boxShadow="4px 0px 12px rgba(23, 23, 83, 0.25)" />
      </Box>
      {/* Details */}
      <Stack direction="row" align="center" spacing="40px" mt="2" pl="4">
        <FundingStat label="raised" amount={raised} usd="3,249.60" />
        <FundingStat label="goal" amount={goal} usd="50,680" />
      </Stack>
    </Box>
  );
}

interface FundingStatProps {
  label: string;
  amount: number;
  usd: string;
}
function FundingStat({ label, amount, usd }: FundingStatProps) {
  return (
    <Stack align="center" justify="center" textAlign="center" spacing="0">
      <Text color="#237B75" lineHeight="normal">
        <Text fontWeight="bold" color="blue.500" as="span">
          {amount.toLocaleString()} AR
        </Text>{" "}
        {label}
      </Text>
      <Text fontSize="xs" color="#717171" lineHeight="normal">
        ${usd} USD
      </Text>
    </Stack>
  );
}
