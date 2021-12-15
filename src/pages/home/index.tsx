import { Link } from "react-router-dom";
// ui
import { Button, Image, Center, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";

export const Home: React.FC = () => {
  return (
    <Center h="100vh" flexDir="column" p="2" textAlign="center" color="white" bg="blue.800">
      <Image w="150px" src={"/static/logo.svg"} alt="koii-network-logo" />
      <Heading>Create Koii App</Heading>
      <Button as={Link} to="/examples" my="2">
        Examples →
      </Button>
      <Button as={ChakraLink} href="https://github.com/koii-network/koii.X#readme" isExternal>
        Documentations ↗
      </Button>
      <Text mt="1">Happy hacking!</Text>
    </Center>
  );
};
