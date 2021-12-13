// context
import { useFinnie } from "components/context/finnie";
// ui
import { Button, Input, Label, Paper } from "components/ui";
// styles
import { Heading } from "./styles";
// code snipperts
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
    <div className="example--wrapper">
      <Heading>— 3 Upload Nft to Koii</Heading>
      <Paper m="1rem 0 0 0" p="1rem">
        <p>
          Complete the form to upload your nft directly to Koii. <small>(After connecting to finnie)</small>
        </p>
        {/* Upload form */}
        <Paper p="1rem" m="0.5rem 0 1rem 0" spacing="0.725rem">
          <div>
            <Label htmlFor="title">Nft Title</Label>
            <Input type="text" id="title" />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input type="text" id="description" />
          </div>
          <div>
            <Label htmlFor="file">Choose a file</Label>
            <Input type="file" id="file" />
          </div>
          <Button>{isLoading ? "Loading..." : isFinnieConnected ? "Uploaded ✓" : "Upload"}</Button>
        </Paper>

        {isFinnieConnected && (
          <Paper bg="#059669" color="white">
            <p>
              <strong>Connected ✓</strong>
            </p>
            <p>
              Your wallet address is: <code>{walletAddress}</code>
            </p>
          </Paper>
        )}

        {isError && (
          <Paper bg="#DC2626" color="white">
            <>An error occurred while connecting to finnie.</>
          </Paper>
        )}

        {/* Code Source */}
        <SyntaxHighlighter customStyle={{ borderRadius: "4px", fontSize: "12px", marginTop: "20px" }} language="javascript" style={darcula}>
          {codeBlock}
        </SyntaxHighlighter>
      </Paper>
      <Button as="a" href="https://github.com/koii-network/koii.X#usekoii" target="_blank" size="md" color="primary" m="1rem 0 0 0">
        <strong>useKoii</strong> Documentations ↗
      </Button>
    </div>
  );
}
