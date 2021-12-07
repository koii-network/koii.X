/* Examples */
import UseFinnieExample from "./UseFinnieExample";
import GetKoiiNftsExample from "./GetKoiiNftsExample";
import UploadNftExample from "./UploadNftExample";
// styles
import { Wrapper, Container } from "./styles";

export const Examples: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <UseFinnieExample />
        <GetKoiiNftsExample />
        <UploadNftExample />
      </Wrapper>
    </Container>
  );
};
