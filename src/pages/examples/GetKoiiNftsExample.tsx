// ui
import { Button, Heading, SimpleGrid, Link } from "@chakra-ui/react";
import { NftCard, Card } from "components/cards";
// code snipperts
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
// hooks
import { useSdk } from "services/hooks";
// utils
import { formatDigitNumber } from "services/utils";

export default function GetKoiiNftsExample() {
  const codeBlock = `
const {wallet, getKoiiNfts} = useSdk(); 

<Button onClick={getKoiiNfts}>
  Get my Koii nfts
</Button>

<NftsListWrapper>
  {wallet?.nfts?.map((nft) => {
    return <NftCard item={nft} key={nft.id} />;
  })}
</NftsListWrapper>
  `.trim();

  /* Working example */
  const { wallet, status, getKoiiNfts } = useSdk();

  return (
    <div>
      <Heading>— 2 Get Koii Nfts</Heading>
      <Card m="1rem 0 0 0" p="1rem">
        <p>
          Click on the button to get your nfts. <small>(After connecting to finnie)</small>
        </p>
        <Button m="5px 0 1rem 0" isLoading={status === "loading"} onClick={getKoiiNfts}>
          {status === "loading" ? "Loading..." : status === "success" ? "Done ✓" : "Get my nfts"}
        </Button>

        {status === "success" && (
          <Card bg="#E5E7EB" color="black">
            <p>
              Total attention: <strong>{formatDigitNumber(wallet?.totalAttention)}</strong>
            </p>
            <p>
              Total Koii: <strong>{Math.round(wallet?.totalReward * 100 || 0) / 100}</strong>
            </p>

            <SimpleGrid columns={[1, 2, 3]} className="custom-scroll" overflowY="auto" maxH="470px" gap="3" px="2">
              {wallet?.nfts?.map((nft: any, id: number) => {
                return <NftCard item={nft} key={nft?.id || id} />;
              })}
            </SimpleGrid>
          </Card>
        )}

        {status === "error" && (
          <Card bg="#DC2626" color="white">
            <>An error occurred getting your nfts or connecting to finnie.</>
          </Card>
        )}

        {/* Code Source */}
        <SyntaxHighlighter customStyle={{ borderRadius: "4px", fontSize: "12px", marginTop: "20px" }} language="javascript" style={darcula}>
          {codeBlock}
        </SyntaxHighlighter>
      </Card>
      <Button as={Link} href="https://github.com/koii-network/koii.X#usesdk" isExternal mt="2">
        <strong>useSdk</strong> Documentations ↗
      </Button>
    </div>
  );
}
