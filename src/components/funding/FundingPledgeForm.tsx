// ui
import { Flex, Text, FormControl, InputGroup, InputRightElement, Input, Stack, Button } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent } from "react";

interface Props {
  onSubmit: (amount?: number) => void;
}

export function FundingPledgeForm({ onSubmit }: Props) {
  const [amount, setAmount] = React.useState<number>();

  function onFormSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(amount);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setAmount(Number(parseFloat(e.target.value).toFixed(4)));
  }
  return (
    <Flex as="form" flexDir="column" alignItems="center" onSubmit={onFormSubmit} bg="white" shadow="lg" p="4" rounded="12px" color="blue.500">
      <Text fontWeight="600" fontSize="2xl">
        Token Only
      </Text>
      <Stack direction="row" spacing="4" align="center" mt="4">
        <FormControl bg="#F5F5F5" color="#171753">
          <InputGroup size="lg">
            <Input type="number" required step={0.001} min={0.001} max={1000.0} value={amount || ""} onChange={onChange} px="4" pr="14" textAlign="right" placeholder="2.0" />
            <InputRightElement pointerEvents="none" color="rgba(55, 55, 101, 1)" fontSize="1.2em" children="ETH" pr="2" />
          </InputGroup>
        </FormControl>
        <Button size="lg" type="submit">
          Pledge
        </Button>
      </Stack>
      <Text mt="4" fontSize="sm">
        “Tokens Only” contributions only receive tokens. They do not receive an NFT. Tokens are rewared in proportion to the pledge amount.
      </Text>
    </Flex>
  );
}
