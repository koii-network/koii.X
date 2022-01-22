import { Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
// pages
import { Home, Nft, Artist, Funding } from "pages";
// ui
import { AppLayout } from "components/layouts";

export const Routes = () => {
  return (
    <>
      <Switch>
        <PublicRoute exact path="/" component={Home} layout={AppLayout} />
        <PublicRoute exact path="/nft/:id" component={Nft} layout={AppLayout} />
        <PublicRoute exact path="/artist/:id" component={Artist} layout={AppLayout} />
        <PublicRoute exact path="/funding" component={Funding} />
      </Switch>
    </>
  );
};
