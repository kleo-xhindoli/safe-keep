import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Icon from "./components/ui/Icon";
import Home from "./pages/Home";
import SecretsPage from "./pages/SecretsPage";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="container px-4 py-12 min-h-screen">
        <div className="flex justify-center items-center mb-6">
          <Icon name="LockClosedSolid" className="mr-1 w-6 h-6" />
          <p className="text-2xl text-center font-semibold">SafeKeep</p>
        </div>

        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/:safeId">
              <SecretsPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
