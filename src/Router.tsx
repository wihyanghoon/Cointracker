import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import Coin from "./pages/Coin";
import Coins from "./pages/Coins";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
