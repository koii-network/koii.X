import { useState, useEffect } from "react";
import { useFunding } from "components/funding";
// api
import { getEthBalance } from "api/funding";
import { useExchangeRates } from "api/funding/useExchangeRates";
// ui
import { Box, Text, Stack, Progress } from "@chakra-ui/react";
// utils
import { formatDigitNumber, parseString } from "services/utils";

export function FundingBar() {
  // config
  const {
    state: { config }
  } = useFunding();
  const goal = config?.goal;
  const { fundContract } = config;

  const [{ status, raisedBalance }, setState] = useState<{ status: string; raisedBalance: string }>({ status: "idle", raisedBalance: "0" });

  const balance = parseString(raisedBalance);

  /* Get Eth Balance */
  const doGetEthBalance = async () => {
    try {
      setState(prevState => ({ ...prevState, status: "loading" }));
      const raisedBalance = await getEthBalance(fundContract);
      setState(prevState => ({ ...prevState, status: "success", balance: raisedBalance }));
    } catch (error) {
      setState(prevState => ({ ...prevState, status: "error" }));
    }
  };

  useEffect(() => {
    doGetEthBalance();
  }, []);

  const percentageDone = ((balance / goal) * 100).toFixed(2);
  return (
    <Box>
      <Text textAlign="right" fontSize="xs" mb="2px">{`%${percentageDone}`}</Text>
      {/* Bar */}
      <Progress color="teal" bg="#D6D6D6" rounded="2xl" size="lg" value={balance} max={goal} h="22px" isIndeterminate={status === "loading"} />

      {/* Details */}
      <Stack direction="row" align="center" spacing="40px" mt="2" pl="4">
        <FundingStat label="raised" amount={balance} />
        <FundingStat label="goal" amount={goal} />
      </Stack>
    </Box>
  );
}

interface FundingStatProps {
  label: string;
  amount: number;
}
function FundingStat({ label, amount }: FundingStatProps) {
  /* Get Exchange rates */
  const { data: rates } = useExchangeRates();

  const amountInUSD = amount * rates?.USD;
  return (
    <Stack align="center" justify="center" textAlign="center" spacing="0">
      <Text color="#237B75" lineHeight="normal">
        <Text fontWeight="bold" color="blue.500" as="span">
          {formatDigitNumber(amount, { minimumSignificantDigits: 2 })} ETH
        </Text>{" "}
        {label}
      </Text>
      <Text fontSize="xs" color="#717171" lineHeight="normal">
        ${formatDigitNumber(amountInUSD)} USD
      </Text>
    </Stack>
  );
}
