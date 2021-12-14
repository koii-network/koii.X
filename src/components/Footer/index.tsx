import { Link } from "react-router-dom";
// ui
import { Button } from "components/ui";
// styles
import { FooterWrapper } from "./styles";

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="container">
        <p>© Koii</p>
        <Button color="primary" as={Link} to="https://github.com/koii-network/koii.X#readme" target="_blank">
          Documentations ↗
        </Button>
      </div>
    </FooterWrapper>
  );
}
