import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/ui/Loader";
import useSession from "./hooks/useSession";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SecretsPage from "./pages/SecretsPage";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { isAuthenticated, isAppInitialized } = useSession();

  if (!isAppInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="container max-w-xl px-4 py-12 min-h-screen">
        <div className="flex justify-center items-center mb-6">
          <img
            alt="SafeKeep Logo"
            src={process.env.PUBLIC_URL + "/LogoHorizontal.png"}
            className="w-52"
          />
        </div>

        <Router>
          <Switch>
            <ProtectedRoute
              path="/"
              condition={isAuthenticated}
              redirect="/auth"
              exact
            >
              <HomePage />
            </ProtectedRoute>
            <Route path="/auth">
              <AuthPage />
            </Route>
            <ProtectedRoute
              condition={isAuthenticated}
              redirect="/auth"
              path="/:safeId"
            >
              <SecretsPage />
            </ProtectedRoute>
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
