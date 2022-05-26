import * as React from "react";
import { hot } from "react-hot-loader";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import { AppT } from './AppT';
import { StoreProvider } from '../store/provider/StoreProvider';
import { NodesView } from './NodesView';
import Spaghetti from "./Spaghetti";

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <StoreProvider>
        <NodesView />
        <Spaghetti />
        {/*<AppT />*/}
      </StoreProvider>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
