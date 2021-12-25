// ui
import { Icon, Center, Image, Text, CenterProps } from "@chakra-ui/react";
// icons
import { FaHeartBroken } from "react-icons/fa";

interface Props extends CenterProps {
  message?: string;
}

export const EmptyState = ({ message, ...rest }: Props) => {
  return (
    <Center px={4} py={4} flexDir="column" w="100%" maxH="400px" {...rest}>
      <Icon as={FaHeartBroken} boxSize="40px" color="gray.400" />
      <Text color="gray.300" fontSize="xl" mt="2">
        {message || "No Nfts"}
      </Text>
    </Center>
  );
};
