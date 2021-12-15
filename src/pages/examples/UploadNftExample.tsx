// context
import { useFinnie } from "components/context/finnie";
// ui
import { Button, Input, FormLabel, Heading } from "@chakra-ui/react";
import { Card } from "components/cards";
// code snippets
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function UploadNftExample() {
  const codeBlock = `
const {state: { connectToFinnie, walletAddress }} = useFinnie(); 

<Button onClick={connectFinnie}>
  Click here to connect
</Button>
  `.trim();

  /* Working example */
  const {
    state: { isLoading, isError, walletAddress, isFinnieConnected }
  } = useFinnie();

  return (
    <div>
      <Heading>— 3 Upload Nft to Koii</Heading>
      <Card m="1rem 0 0 0" p="1rem">
        <p>
          Complete the form to upload your nft directly to Koii. <small>(After connecting to finnie)</small>
        </p>
        {/* Upload form */}
        <Card p="1rem" m="0.5rem 0 1rem 0" spacing="0.725rem">
          <div>
            <FormLabel htmlFor="title">Nft Title</FormLabel>
            <Input type="text" id="title" />
          </div>
          <div>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input type="text" id="username" />
          </div>
          <div>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input type="text" id="description" />
          </div>
          <div>
            <FormLabel htmlFor="file">Choose a file</FormLabel>
            <Input type="file" id="file" />
          </div>
          <Button>{isLoading ? "Loading..." : isFinnieConnected ? "Uploaded ✓" : "Upload"}</Button>
        </Card>

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
      <Button as="a" href="https://github.com/koii-network/koii.X#usekoii" target="_blank" m="1rem 0 0 0">
        <strong>useKoii</strong> Documentations ↗
      </Button>
    </div>
  );
}
