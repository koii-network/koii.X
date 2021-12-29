import { ReactNode } from "react";
// ui
import { Center, Alert, AlertIcon, AlertTitle, AlertDescription, CenterProps } from "@chakra-ui/react";

interface Props extends CenterProps {
  title: any;
  description: any;
  children?: ReactNode;
}

export const ErrorState = ({ title, description, children, ...restProps }: Props) => {
  return (
    <Center {...restProps}>
      <Alert status="error" variant="left-accent" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" minH="200px">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm" mb="2">
          {description}
        </AlertDescription>
        {children}
      </Alert>
    </Center>
  );
};
