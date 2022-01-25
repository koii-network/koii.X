// ui
import { Flex, Text, FormControl, InputGroup, InputRightElement, Input, Stack, Button } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

export function FundingPledgeForm() {
  const [amount, setAmount] = React.useState<any>(null);
  function onSubmit() {
    console.log({ amount });
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }
  return (
    <Flex flexDir="column" alignItems="center" as="form" onSubmit={onSubmit} bg="white" shadow="lg" p="4" rounded="12px" color="blue.500">
      <Text fontWeight="600" fontSize="2xl">
        Token Only
      </Text>
      <Stack direction="row" spacing="4" align="center" mt="4">
        <FormControl bg="#F5F5F5" color="#171753">
          <InputGroup size="lg">
            <Input type="number" required step={0.1} min={0.0001} value={amount} onChange={onChange} px="4" pr="14" textAlign="right" placeholder="2.0" />
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
