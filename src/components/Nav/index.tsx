// context
import { useFinnie } from "components/context/finnie";
// ui
import { Button } from "components/ui";
// styles
import { NavWrapper } from "./styles";

export default function Nav() {
  const {
    state: { connectFinnie, isLoading, isFinnieConnected }
  } = useFinnie();
  return (
    <NavWrapper>
      <div className="container">
        <h2>Koii App</h2>
        {/* Connect to finnie button */}
        {isFinnieConnected ? null : (
          <Button color="secondary" isLoading={isLoading} onClick={connectFinnie}>
            {isLoading ? "Connecting..." : "Connect finnie"}
          </Button>
        )}
      </div>
    </NavWrapper>
  );
}
