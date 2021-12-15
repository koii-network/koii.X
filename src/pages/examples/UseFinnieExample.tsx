// context
import { useFinnie } from "components/context/finnie";
// ui
import { Button, Heading } from "@chakra-ui/react";
import { Card } from "components/cards";

// code snippets
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function UseFinnieExample() {
  const codeBlock = `
const {state: {connectToFinnie, walletAddress}} = useFinnie(); 

<Button onClick={connectFinnie}>
  Click here to connect
</Button>
  `.trim();

  /* Working example */
  const {
    state: { connectFinnie, isLoading, isError, walletAddress, isFinnieConnected }
  } = useFinnie();

  return (
    <div>
      <Heading>— 1 Connect to Finnie</Heading>
      <Card m="1rem 0 0 0" p="1rem">
        <p>Click on the button to connect to Finnie.</p>
        <Button isLoading={isLoading} onClick={connectFinnie}>
          {isLoading ? "Connecting..." : isFinnieConnected ? "Connected ✓" : "Connect to finnie"}
        </Button>

        {isFinnieConnected && (
          <Card bg="#059669" color="white">
            <p>
              <strong>Connected ✓</strong>
            </p>
            <p>
              Your wallet address is: <code>{walletAddress}</code>
            </p>
          </Card>
        )}

        {isError && (
          <Card bg="#DC2626" color="white">
            <>An error occurred while connecting to finnie.</>
          </Card>
        )}

        {/* Code Source */}
        <SyntaxHighlighter customStyle={{ borderRadius: "4px", fontSize: "12px", marginTop: "20px" }} language="javascript" style={darcula}>
          {codeBlock}
        </SyntaxHighlighter>
      </Card>
      <Button as="a" href="https://github.com/koii-network/koii.X#usefinnie" target="_blank" m="1rem 0 0 0">
        <strong>useFinnie</strong> Documentations ↗
      </Button>
    </div>
  );
}
